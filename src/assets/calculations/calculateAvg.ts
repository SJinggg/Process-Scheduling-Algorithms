import process from '../process';
import { totalWaitingTime, totalTurnAround } from './calculateTotal';

export function avgTurnAround (process: process[]) {
  let avg = totalTurnAround(process) / process.length;

  return avg;
}

export function avgWaitingTime (process: process[]) {
  let avg = totalWaitingTime(process) / process.length;

  return avg;
}