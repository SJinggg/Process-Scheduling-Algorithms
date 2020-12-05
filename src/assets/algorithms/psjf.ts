import process, {clone} from '../process';
import { compareBurstTime, compareArrival } from '../comparators/comparators';

export default function psjf(p: process[]) {
  let waitingList: process[] = [...p].sort(compareArrival);
  let minArr = findMinArrival(p);
  let psjfPro: process[] = [...p]; 
  let psjf: process[] = []; 
  let arrivedList: process[] = [];

  let totalBurstTime = waitingList.reduce((total, currp) => {
    return total + currp.getBurstTime();
  }, 0) + minArr;

  psjf.push(clone(waitingList[0]));
  psjf[0].setStartTime(minArr);
  psjf[0].setLeftTime();
  waitingList.shift();
  for(let i = minArr + 1; i <= totalBurstTime; i++) {
    for(let n = 0; n < waitingList.length; n++) {
      if(waitingList[n].getArrivalTime() === i) {
        arrivedList.push(clone(waitingList[n]));
        waitingList.shift();
      }
      else break;
    }

    if(arrivedList.length > 1){
      arrivedList.sort(compareBurstTime);
    }

    if(psjf[psjf.length - 1].isCompleted()) {
      psjf[psjf.length - 1].setEndTime(i);
      psjf[psjf.length - 1].setTurnAround(i - psjf[psjf.length - 1].getArrivalTime());
      psjf[psjf.length - 1].setWaitTime(psjf[psjf.length - 1].getTurnAround() - psjf[psjf.length - 1].getBurstTime());

      let temp = psjfPro.find(o => o.getProcessName() === psjf[psjf.length - 1].getProcessName());
      let index: number;
      if(temp){
        index = psjfPro.indexOf(temp);
        psjfPro[index].setEndTime(psjf[psjf.length - 1].getEndTime());
        psjfPro[index].setTurnAround(psjf[psjf.length - 1].getTurnAround());
        psjfPro[index].setWaitTime(psjf[psjf.length - 1].getWaitTime());
      }

      if(arrivedList.length > 0) {
        psjf.push(clone(arrivedList[0]));
        psjf[psjf.length - 1].setStartTime(i);
        psjf[psjf.length - 1].setLeftTime();
        arrivedList.shift();

        let temp = psjfPro.find(o => o.getProcessName() === psjf[psjf.length - 1].getProcessName());
        let index: number;
        if(temp){
          index = psjfPro.indexOf(temp);
          psjfPro[index].setStartTime(psjf[psjf.length - 1].getStartTime());
        }
      }
    }
    else {
      if(arrivedList.length > 0 && psjf[psjf.length - 1].getBurstTime() > arrivedList[0].getBurstTime()) {
        psjf[psjf.length - 1].setEndTime(i);
        arrivedList.push(clone(psjf[psjf.length - 1]));

        psjf.push(clone(arrivedList[0]));
        psjf[psjf.length - 1].setStartTime(i);
        psjf[psjf.length - 1].setLeftTime();
        arrivedList.shift();
        
        arrivedList.sort(compareBurstTime);
      }
      else {
        psjf[psjf.length - 1].setLeftTime();
      }
    }
  }
  return {psjf, psjfPro};
}

function findMinArrival (process: any) {
  let min = 100;
    process.forEach((p: { getArrivalTime: () => number; }) => {
      if(p.getArrivalTime() < min)
        min = p.getArrivalTime();
    })

  return min;
}
