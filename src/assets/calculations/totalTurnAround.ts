import process from '../process';

export default function totalTurnAround (process: process[]) {
  let total = process.reduce((sum, p) => {
    return sum + p.getTurnAround();
  }, 0);

  return total;
}