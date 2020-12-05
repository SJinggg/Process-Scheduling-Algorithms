export default class Process{
  processName: string | undefined;
  static processNum: number = 0;
  processDtl: { arrivalTime: number; burstTime: number; priority: number; startTime: number; leftTime: number; endTime: number; turnAround: number; waitTime: number; } | undefined;
  color: string | undefined;

  constructor (processName: string, arrivalTime: number, priority: number, burstTime: number, color: any) {
    this.processName = processName;
    this.processDtl = {
      arrivalTime: Number(arrivalTime),
      burstTime: Number(burstTime),
      priority: Number(priority),
      startTime: -1,
      leftTime: Number(burstTime),
      endTime: -1,
      turnAround: -1,
      waitTime: -1
    };
    this.color= color;
  };

  /** Getters or Accessors */
  public getProcessName () { return this.processName; };

  public getArrivalTime (): number { if (!this.processDtl) return -1; return this.processDtl.arrivalTime; };

  public getBurstTime (): number { if (!this.processDtl) return -1; return this.processDtl.burstTime; };

  public getPriority (): number { if (!this.processDtl) return -1; return this.processDtl.priority; };

  public getStartTime (): number { if (!this.processDtl) return -1; return this.processDtl.startTime; };

  public getLeftTime (): number { if (!this.processDtl) return -1; return this.processDtl.leftTime; };

  public getEndTime (): number { if (!this.processDtl) return -1; return this.processDtl.endTime; };

  public getTurnAround (): number { if (!this.processDtl) return -1; return this.processDtl.turnAround; };

  public getWaitTime (): number { if (!this.processDtl) return 1; return this.processDtl.waitTime; };

  public getColor () { return this.color; };

  /** Setters or Mutators */
  public setArrivalTime (time: number) { if (this.processDtl) this.processDtl.arrivalTime = time; };

  public setStartTime (time: number) { if (this.processDtl) this.processDtl.startTime = time; };

  public setLeftTime () { if (this.processDtl) this.processDtl.leftTime -= 1; };

  public setEndTime (time: number) { if (this.processDtl) this.processDtl.endTime = time; };

  public setTurnAround (time: number) { if (this.processDtl) this.processDtl.turnAround = time; };

  public setWaitTime (time: number) { if (this.processDtl) this.processDtl.waitTime = time; };

  /** Status update */
  public isCompleted () { 
    if (!this.processDtl) return false;
    return (this.processDtl.leftTime === 0);
  };

  public isArrived (time: number) {
    if (!this.processDtl) return false;
    return (this.processDtl.arrivalTime >= time);
  };

}

export function clone(instance: any) {
  return Object.assign(
    Object.create(
      // Set the prototype of the new object to the prototype of the instance.
      // Used to allow new object behave like class instance.
      Object.getPrototypeOf(instance),
    ),
    // Prevent shallow copies of nested structures like arrays, etc
    JSON.parse(JSON.stringify(instance)),
  );
}