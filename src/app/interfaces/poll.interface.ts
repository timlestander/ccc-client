import { OptionInterface } from './option.interface';

export interface PollInterface {
  id: number;
  question: string;
  userId: number;
  options?: OptionInterface[];
  totalVotes?: number;
}
