import {
  CreatePlayerDto,
  GetPlayerDto,
  GetPlayerPhotoDto,
} from '@common/dto/player';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { map, Observable, of, tap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { File } from '@nest-lab/fastify-multer';
import { JoinedPlayerService } from './joined-players.service';

@Injectable()
export class PlayerService {
  constructor(private readonly joinedPlayerService: JoinedPlayerService) {}

  create(player: CreatePlayerDto): Observable<GetPlayerDto> {
    return of(player).pipe(
      map(({ name }) => {
        return {
          name,
          token: uuidv4(),
        };
      }),
      tap((player) => {
        this.joinedPlayerService.player = {
          ...player,
          deck: { cards: [] },
          photo: '',
        };

        console.log(this.joinedPlayerService.players);
      }),
    );
  }

  uploadPhoto(file: File, token: string): Observable<GetPlayerPhotoDto | null> {
    console.log(this.joinedPlayerService.players);
    const player = this.joinedPlayerService.players.find(
      (item) => item.token === token,
    );

    console.log(player, token);
    if (!player) {
      throw new HttpException('Player not found', HttpStatus.NOT_FOUND);
    }

    return of({
      ...player,
      photo: `http://localhost:3000/public/${file.originalname}`,
    });
  }
}
