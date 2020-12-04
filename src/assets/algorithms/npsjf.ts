import process from '../process';
import { compareBurstTime } from '../comparators/comparators';

export default function npsjf(process: process[]) {
  let npsjfPro: process[] = [...process].sort(compareBurstTime);
  let minArr = findMinArrival(process);

  let time = minArr;
  for(let i = 0; i < npsjfPro.length; i++) {
    npsjfPro[i].setStartTime(time);
    npsjfPro[i].setEndTime(time + npsjfPro[i].getBurstTime());
    npsjfPro[i].setWaitTime(npsjfPro[i].getEndTime() - npsjfPro[i].getArrivalTime());
    npsjfPro[i].setTurnAround(npsjfPro[i].getEndTime() - npsjfPro[i].getArrivalTime());
    time += npsjfPro[i].getBurstTime();
  }
  return npsjfPro;
}

function findMinArrival (process: any) {
  let min = 100;
    process.forEach((p: { getArrivalTime: () => number; }) => {
      if(p.getArrivalTime() < min)
        min = p.getArrivalTime();
    })

  return min;
}
