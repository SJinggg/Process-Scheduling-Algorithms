import process from '../process';

export function compareArrival (p1: process, p2: process) {
  return p1.getArrivalTime() - p2.getArrivalTime();
}

export function compareBurstTime (p1: process, p2: process) {
  return p1.getLeftTime() - p2.getLeftTime();
}

export function comparePriority (p1: process, p2: process) {
  return p1.getPriority() - p2.getPriority();
}

export function compareName (p1: process, p2: process) {
  let p1name:any = p1.getProcessName();
  let p2name:any = p2.getProcessName();
  if (p1name > p2name) return 1;
  else if(p1name < p2name) return -1;
  else return 1;
}