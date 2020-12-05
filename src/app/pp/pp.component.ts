import { Component, Input, OnInit } from '@angular/core';
import pp from '../../assets/algorithms/pp';
import process from '../../assets/process';
import { avgTurnAround, avgWaitingTime } from '../../assets/calculations/calculateAvg';
import { totalTurnAround, totalWaitingTime } from '../../assets/calculations/calculateTotal';

@Component({
  selector: 'app-pp',
  template: `<h3>Preemptive Priority (PP)</h3>
  <app-cell *ngFor="let process of ppprocess;" [myProcess]="process" [width]=getWidth(process.getBurstTime()) [last]="ppprocess.length"></app-cell>`
})
export class PpComponent implements OnInit {

  totalBurstTime = 0;
  process: process[] = [];
  ppprocess: process[] = [];
  result: any;

  @Input() myProcess: any;

  constructor() { }

  ngOnInit(): void {
    this.generateProcess();
    this.calculatePSJF();
  }

  generateProcess() {
    this.myProcess.processes.forEach((p: { name: string; start: number; burst: number; priority: number; color: any; }) => {
      this.process.push(new process(p.name, p.start, p.priority, p.burst, p.color))
    })
  }

  calculatePSJF() {
    this.result = pp(this.process);
    this.ppprocess = this.result.pp;
    console.log(this.ppprocess.length);
    this.totalBurstTime = this.ppprocess.reduce((sum, p) => {
      return sum + p.getBurstTime();
    }, 0);
  }

  getWidth(bt: number) {
    return bt/this.totalBurstTime*100;
  } 

}
