import { Player } from '@core/interfaces/player';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JoinedPlayerService {
  private _players: Player[] = [];

  get players(): ReadonlyArray<Player> {
    return this._players;
  }

  set player(player: Player) {
    this._players = [...this._players, player];
  }
}
