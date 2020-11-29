import process from '../process';

export default function totalWaitingTime (process: process[]) {
  let total = process.reduce((sum, p) => {
    return sum + p.getWaitTime();
  }, 0);

  return total;
}