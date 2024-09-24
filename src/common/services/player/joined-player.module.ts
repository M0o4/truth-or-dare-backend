import { Global, Module } from '@nestjs/common';
import { JoinedPlayerService } from './joined-players.service';

@Global()
@Module({
  providers: [JoinedPlayerService],
  exports: [JoinedPlayerService],
})
export class JoinedPlayerModule {}
