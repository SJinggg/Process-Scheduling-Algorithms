import process from '../process';

export default function fcfs(...process: process[]) {
  let p: process[] = [];
  let inProcess: boolean = false;
  let minAT = (() => {
    let atime = process.reduce((at: any, item) => {
      return at.push(item.getArrivalTime());
    }, []);
    return Math.min(...atime);
  })
  const totalBurstTime = process.reduce((total, item) => {
    return total + item.getBurstTime();
  }, 0) + minAT();
  for (let i = 0; i < totalBurstTime; i++) {
    while(process.length >= 0){
      for (let j = 0; j < process.length; j++) {
        if (process[j].isArrived(i)) {
          if (!inProcess) {
            p.push(process[j]);
            inProcess = true;
            p[p.length - 1].setStartTime(i);
            p[p.length - 1].setWaitTime(i - process[p.length - 1].getArrivalTime());
            p[p.length - 1].setLeftTime(p[p.length - 1].getBurstTime() - 1);
            p[p.length - 1].setTurnAround(process[p.length - 1].getEndTime() - process[p.length - 1].getArrivalTime());
          }
          else {
            p[p.length - 1].setLeftTime(p[p.length - 1].getLeftTime() - 1);
            if(p[p.length - 1].getLeftTime() === 1) {
              inProcess = false;
            }
          }
        }
      }
    }
  }

  return p;
};