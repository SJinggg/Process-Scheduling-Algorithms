import process, {clone} from '../process';
import { compareArrival } from '../comparators/comparators';

export default function rr(p: process[], rrI: number) {
  let waitingList: process[] = [...p].sort(compareArrival);
  let minArr = findMinArrival(p);
  let rrPro: process[] = [...p]; 
  let rr: process[] = []; 
  let totalBurstTime = waitingList.reduce((total, currp) => {
    return total + currp.getBurstTime();
  }, 0) + minArr;

  rr.push(clone(waitingList[0]));
  rr[0].setStartTime(minArr);
  rr[0].setLeftTime();
  waitingList.shift();
  for(let i = minArr + 1; i <= totalBurstTime; i++) {
    if(rr[rr.length - 1].isCompleted()) {
      rr[rr.length - 1].setEndTime(i);

      let temp = rrPro.find(o => o.getProcessName() === rr[rr.length - 1].getProcessName());
      let index: number;
      if(temp){
        index = rrPro.indexOf(temp);
        rrPro[index].setEndTime(rr[rr.length - 1].getEndTime());
        rrPro[index].setTurnAround(i - rrPro[index].getArrivalTime());
        rrPro[index].setWaitTime(rrPro[index].getTurnAround() - rrPro[index].getBurstTime());
      }

      if(waitingList.length > 0) {
        rr.push(clone(waitingList[0]));
        rr[rr.length - 1].setStartTime(i);
        rr[rr.length - 1].setLeftTime();
        waitingList.shift();

        let temp = rrPro.find(o => o.getProcessName() === rr[rr.length - 1].getProcessName());
        let index: number;
        if(temp){
          index = rrPro.indexOf(temp);
          rrPro[index].setStartTime(rr[rr.length - 1].getStartTime());
        }
      }
    }
    else {
      if(waitingList.length > 0 && i % rrI === 0) {
        rr[rr.length - 1].setEndTime(i);
        waitingList.push(clone(rr[rr.length - 1]));
        waitingList[waitingList.length - 1].setArrivalTime(i);
        waitingList.sort(compareArrival);

        rr.push(clone(waitingList[0]));
        rr[rr.length - 1].setStartTime(i);
        rr[rr.length - 1].setLeftTime();
        waitingList.shift();
      }
      else {
        rr[rr.length - 1].setLeftTime();
      }
    }
  }
  return {rr, rrPro};
}

function findMinArrival (process: any) {
  let min = 100;
    process.forEach((p: { getArrivalTime: () => number; }) => {
      if(p.getArrivalTime() < min)
        min = p.getArrivalTime();
    })

  return min;
}
