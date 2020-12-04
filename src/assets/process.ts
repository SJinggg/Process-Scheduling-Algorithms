export default class Process{
  #processName: string;
  static processNum: number = 0;
  #processDtl: { arrivalTime: number, burstTime: number, priority: number, startTime: number, leftTime: number, endTime: number, turnAround: number, waitTime: number};
  #color: string;

  constructor (processName: string, arrivalTime: number, priority: number, burstTime: number, color: any) {
    this.#processName = processName;
    this.#processDtl = {
      arrivalTime: Number(arrivalTime),
      burstTime: Number(burstTime),
      priority: Number(priority),
      startTime: -1,
      leftTime: -1,
      endTime: -1,
      turnAround: -1,
      waitTime: -1
    };
    this.#color= color;
  };

  /** Getters or Accessors */
  public getProcessName () { return this.#processName; };

  public getArrivalTime (): number { return this.#processDtl.arrivalTime; };

  public getBurstTime (): number { return this.#processDtl.burstTime; };

  public getPriority (): number { return this.#processDtl.priority; };

  public getStartTime (): number { return this.#processDtl.startTime; };

  public getLeftTime (): number { return this.#processDtl.leftTime; };

  public getEndTime (): number { return this.#processDtl.endTime; };

  public getTurnAround (): number { return this.#processDtl.turnAround; };

  public getWaitTime (): number { return this.#processDtl.waitTime; };

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