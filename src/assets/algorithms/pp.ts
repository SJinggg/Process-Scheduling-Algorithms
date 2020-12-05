import process, {clone} from '../process';
import { comparePriority } from '../comparators/comparators';

export default function pp(p: process[]) {
  let waitingList: process[] = [...p].sort(comparePriority);
  let minArr = findMinArrival(p);
  let ppPro: process[] = [...p]; 
  let pp: process[] = []; 
  let totalBurstTime = waitingList.reduce((total, currp) => {
    return total + currp.getBurstTime();
  }, 0) + minArr;

  pp.push(clone(waitingList[0]));
  pp[0].setStartTime(minArr);
  pp[0].setLeftTime();
  waitingList.shift();
  for(let i = minArr + 1; i <= totalBurstTime; i++) {
    if(pp[pp.length - 1].isCompleted()) {
      pp[pp.length - 1].setEndTime(i);
      pp[pp.length - 1].setTurnAround(i - pp[pp.length - 1].getArrivalTime());
      pp[pp.length - 1].setWaitTime(pp[pp.length - 1].getTurnAround() - pp[pp.length - 1].getArrivalTime());

      let temp = ppPro.find(o => o.getProcessName() === pp[pp.length - 1].getProcessName());
      let index: number;
      if(temp){
        index = ppPro.indexOf(temp);
        ppPro[index].setEndTime(pp[pp.length - 1].getEndTime());
        ppPro[index].setTurnAround(pp[pp.length - 1].getTurnAround());
        ppPro[index].setWaitTime(pp[pp.length - 1].getWaitTime());
      }

      if(waitingList.length > 0) {
        pp.push(clone(waitingList[0]));
        pp[pp.length - 1].setStartTime(i);
        pp[pp.length - 1].setLeftTime();
        waitingList.shift();

        let temp = ppPro.find(o => o.getProcessName() === pp[pp.length - 1].getProcessName());
        let index: number;
        if(temp){
          index = ppPro.indexOf(temp);
          ppPro[index].setStartTime(pp[pp.length - 1].getStartTime());
        }
      }
    }
    else {
      if(waitingList.length > 0 && pp[pp.length - 1].getPriority() > waitingList[0].getPriority()) {
        pp[pp.length - 1].setEndTime(i);
        waitingList.push(clone(pp[pp.length - 1]));

        pp.push(clone(waitingList[0]));
        pp[pp.length - 1].setStartTime(i);
        pp[pp.length - 1].setLeftTime();
        waitingList.shift();
        
        waitingList.sort(comparePriority);
      }
      else {
        pp[pp.length - 1].setLeftTime();
      }
    }
  }
  return {pp, ppPro};
}

function findMinArrival (process: any) {
  let min = 100;
    process.forEach((p: { getArrivalTime: () => number; }) => {
      if(p.getArrivalTime() < min)
        min = p.getArrivalTime();
    })

  return min;
}
