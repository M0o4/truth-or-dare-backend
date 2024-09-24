import { Deck } from '../deck';

export interface Player {
  token: string;
  name: string;
  photo: string;
  deck: Deck;
}
