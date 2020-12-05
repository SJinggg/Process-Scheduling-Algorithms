import process from '../process';

export function compareArrival (p1: process, p2: process) {
  return p1.getArrivalTime() - p2.getArrivalTime();
}

export function compareBurstTime (p1: process, p2: process) {
  return (compareArrival(p1, p2) === 0 ? p1.getBurstTime() - p2.getBurstTime() : compareArrival(p1, p2));
}

export function comparePriority (p1: process, p2: process) {
  return (compareArrival(p1, p2) === 0 ? p1.getPriority() - p2.getPriority() : compareArrival(p1, p2));
}

export function compareName (p1: process, p2: process) {
  if (p1.getProcessName() > p2.getProcessName()) return -1;
  else if(p1.getProcessName() < p2.getProcessName()) return 1;
  else return 1;
}