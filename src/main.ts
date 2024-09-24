import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { PlayerModule } from '@common/controllers/player';
import fastifyHelmet from '@fastify/helmet';
import * as fastStatic from '@fastify/static';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix('v1');

  app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  app.register(fastStatic, {
    root: path.join(__dirname, '..', 'public'),
    prefix: '/public/', // optional: default '/'
  });

  const config = new DocumentBuilder()
    .setTitle('Truth or Dare Card Game')
    .setDescription(
      'Truth or Dare is a card game whose main feature is the ability to bluff or figure out your opponents deception.',
    )
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKet: string, methodKey: string) => methodKey,
    include: [AppModule, PlayerModule],
    deepScanRoutes: true,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  await app.listen(3000);
}
bootstrap();
