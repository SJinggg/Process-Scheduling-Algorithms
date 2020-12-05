import process from '../process';
import { comparePriority } from '../comparators/comparators';

export default function npp(process: process[]) {
  let nppPro: process[] = [...process].sort(comparePriority);
  let minArr = findMinArrival(process);

  let time = minArr;
  for(let i = 0; i < nppPro.length; i++) {
    nppPro[i].setStartTime(time);
    nppPro[i].setEndTime(time + nppPro[i].getBurstTime());
    nppPro[i].setTurnAround(nppPro[i].getEndTime() - nppPro[i].getArrivalTime());
    nppPro[i].setWaitTime(nppPro[i].getTurnAround() - nppPro[i].getArrivalTime());
    time += nppPro[i].getBurstTime();
  }
  return nppPro;
}

function findMinArrival (process: any) {
  let min = 100;
    process.forEach((p: { getArrivalTime: () => number; }) => {
      if(p.getArrivalTime() < min)
        min = p.getArrivalTime();
    })

  return min;
}
