import process, { clone } from '../process';
import { comparePriority, compareArrival, compareName } from '../comparators/comparators';

export default function npp(process: process[]) {
  let waitingList: process[] = [...process].sort(compareArrival);
  let minArr = findMinArrival(process);
  let nppPro: process[] = [];
  let arrivedList: process[] = [];

  let totalBurstTime = waitingList.reduce((total, currp) => {
    return total + currp.getBurstTime();
  }, 0) + minArr;

  nppPro.push(clone(waitingList[0]));
  nppPro[0].setStartTime(minArr);
  nppPro[0].setLeftTime();
  waitingList.shift();
  for(let i = minArr + 1; i <= totalBurstTime; i++){
    for(let j = 0; j < waitingList.length; j++){
      if(waitingList[j].getArrivalTime() === i){
        arrivedList.push(clone(waitingList[j]));
        waitingList.shift();
      }
      else break;
    }

    if(arrivedList.length > 1){
      arrivedList.sort(comparePriority);
    }

    if(nppPro[nppPro.length - 1].isCompleted()){
      nppPro[nppPro.length - 1].setEndTime(i);
      nppPro[nppPro.length - 1].setTurnAround(i - nppPro[nppPro.length - 1].getArrivalTime());
      nppPro[nppPro.length - 1].setWaitTime(nppPro[nppPro.length - 1].getTurnAround() - nppPro[nppPro.length - 1].getBurstTime());

      if(arrivedList.length > 0){
        nppPro.push(clone(arrivedList[0]));
        nppPro[nppPro.length - 1].setStartTime(i);
        nppPro[nppPro.length - 1].setLeftTime();
        arrivedList.shift();
      }
    }
    else{
      nppPro[nppPro.length - 1].setLeftTime();
    }
  }

  let sortednpp = [...nppPro].sort(compareName);

  return {nppPro, sortednpp};
}

function findMinArrival (process: any) {
  let min = 100;
    process.forEach((p: { getArrivalTime: () => number; }) => {
      if(p.getArrivalTime() < min)
        min = p.getArrivalTime();
    })

  return min;
}
