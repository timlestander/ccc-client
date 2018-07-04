import { VoteInterface } from './vote.interface';

export class OptionInterface {
  id?: number;
  text: string;
  pollId?: number;
  votes?: VoteInterface[];
}
