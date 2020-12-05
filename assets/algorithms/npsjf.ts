import process, { clone } from '../process';
import { compareArrival, compareBurstTime, compareName } from '../comparators/comparators';

export default function npsjf(process: process[]) {
  let waitingList: process[] = [...process].sort(compareArrival);
  let minArr = findMinArrival(process);
  let npsjfPro: process[] = [];
  let arrivedList: process[] = [];

  let totalBurstTime = waitingList.reduce((total, currp) => {
    return total + currp.getBurstTime();
  }, 0) + minArr;

  npsjfPro.push(clone(waitingList[0]));
  npsjfPro[0].setStartTime(minArr);
  npsjfPro[0].setLeftTime();
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
      arrivedList.sort(compareBurstTime);
    }

    if(npsjfPro[npsjfPro.length - 1].isCompleted()){
      npsjfPro[npsjfPro.length - 1].setEndTime(i);
      npsjfPro[npsjfPro.length - 1].setTurnAround(i - npsjfPro[npsjfPro.length - 1].getArrivalTime());
      npsjfPro[npsjfPro.length - 1].setWaitTime(npsjfPro[npsjfPro.length - 1].getTurnAround() - npsjfPro[npsjfPro.length - 1].getBurstTime());

      if(arrivedList.length > 0){
        npsjfPro.push(clone(arrivedList[0]));
        npsjfPro[npsjfPro.length - 1].setStartTime(i);
        npsjfPro[npsjfPro.length - 1].setLeftTime();
        arrivedList.shift();
      }
    }
    else{
      npsjfPro[npsjfPro.length - 1].setLeftTime();
    }
  }

  let sortednpsjf = [...npsjfPro].sort(compareName);

  return {npsjfPro, sortednpsjf};
}

function findMinArrival (process: any) {
  let min = 100;
    process.forEach((p: { getArrivalTime: () => number; }) => {
      if(p.getArrivalTime() < min)
        min = p.getArrivalTime();
    })

  return min;
}
