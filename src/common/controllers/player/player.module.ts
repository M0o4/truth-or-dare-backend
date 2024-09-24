import { Module } from '@nestjs/common';

import { PlayerController } from './player.controller';
import { FastifyMulterModule } from '@nest-lab/fastify-multer';
import { JoinedPlayerModule, PlayerService } from '@common/services/player';

FastifyMulterModule.register({
  dest: '/src/storage',
});

@Module({
  imports: [FastifyMulterModule, JoinedPlayerModule],
  controllers: [PlayerController],
  providers: [PlayerService],
})
export class PlayerModule {}
