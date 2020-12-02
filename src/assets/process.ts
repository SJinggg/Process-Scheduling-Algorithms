export default class Process{
  #processName: string;
  static processNum: number = 0;
  #processDtl: { arrivalTime: any, burstTime: any, priority: any, startTime: any, leftTime: any, endTime: any, turnAround: any, waitTime: any};
  #color: string;

  constructor (processName: string, arrivalTime: any, priority: any, burstTime: any, color: any) {
    this.#processName = processName;
    this.#processDtl = {
      arrivalTime: arrivalTime,
      burstTime: burstTime,
      priority: priority,
      startTime: undefined,
      leftTime: undefined,
      endTime: undefined,
      turnAround: undefined,
      waitTime: undefined
    };
    this.#color= color;
  };

  /** Getters or Accessors */
  public getProcessName () { return this.#processName; };

  public getArrivalTime () { return this.#processDtl.arrivalTime; };

  public getBurstTime () { return this.#processDtl.burstTime; };

  public getPriority () { return this.#processDtl.priority; };

  public getStartTime () { return this.#processDtl.startTime; };

  public getLeftTime () { return this.#processDtl.leftTime; };

  public getEndTime () { return this.#processDtl.endTime; };

  public getTurnAround () { return this.#processDtl.turnAround; };

  public getWaitTime () { return this.#processDtl.waitTime; };

  public getColor () { return this.#color; };

  /** Setters or Mutators */
  public setStartTime (time: any) { this.#processDtl.startTime = time; };

  public setLeftTime (time: any) { this.#processDtl.leftTime -= time; if(this.isCompleted()) this.setEndTime(time + this.#processDtl.leftTime); };

  public setEndTime (time: any) { this.#processDtl.endTime = time; };

  public setTurnAround (time: any) { this.#processDtl.turnAround = time; };

  public setWaitTime (time: any) { this.#processDtl.waitTime = time; };

  /** Status update */
  public isCompleted () {
    return (this.#processDtl.leftTime == 0);
  };

  public isArrived (time: any) {
    return (this.#processDtl.arrivalTime >= time);
  };

}