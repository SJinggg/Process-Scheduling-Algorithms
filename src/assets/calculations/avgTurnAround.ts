import process from '../process';
import totalTurnAround from './totalTurnAround';

export default function avgTurnAround (process: process[]) {
  let avg = totalTurnAround(process) / process.length;

  return avg;
}