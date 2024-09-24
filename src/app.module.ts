import { Module } from '@nestjs/common';

import { PlayerModule } from '@common/controllers/player';

import { AppController } from './app.controller';

@Module({
  imports: [PlayerModule],
  controllers: [AppController],
})
export class AppModule {}
