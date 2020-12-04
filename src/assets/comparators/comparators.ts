import process from '../process';

export function compareArrival (p1: process, p2: process) {
  return p1.getArrivalTime() - p2.getArrivalTime();
}

export function compareBurstTime (p1: process, p2: process) {
  return p1.getBurstTime() - p2.getBurstTime();
}

export function comparePriority (p1: process, p2: process) {
  return p1.getPriority() - p2.getPriority();
}