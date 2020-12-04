import process from '../process';
import { compareArrival } from '../comparators/comparators';

export default function fcfs(process: process[]) {
  /** Variable initialization */
  let fcfsPro: process[] = [...process].sort(compareArrival);
  let minArr = findMinArrival(process);

  let time = minArr;
  for(let i = 0; i < fcfsPro.length; i++) {
    fcfsPro[i].setStartTime(time);
    fcfsPro[i].setEndTime(time + fcfsPro[i].getBurstTime());
    fcfsPro[i].setWaitTime(fcfsPro[i].getEndTime() - fcfsPro[i].getArrivalTime());
    fcfsPro[i].setTurnAround(fcfsPro[i].getEndTime() - fcfsPro[i].getArrivalTime());
    time += fcfsPro[i].getBurstTime();
  }
  return fcfsPro;
};

function findMinArrival (process: any) {
  let min = 100;
    process.forEach((p: { getArrivalTime: () => number; }) => {
      if(p.getArrivalTime() < min)
        min = p.getArrivalTime();
    })

  return min;
}


