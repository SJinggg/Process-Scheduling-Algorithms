import process from '../process';
import totalWaitingTime from './totalWaitingTime';

export default function avgWaitingTime (process: process[]) {
  let avg = totalWaitingTime(process) / process.length;

  return avg;
}