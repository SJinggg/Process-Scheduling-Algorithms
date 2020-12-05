import { Component, Input, OnInit } from '@angular/core';
import psjf from '../../assets/algorithms/psjf';
import process from '../../assets/process';
import { avgTurnAround, avgWaitingTime } from '../../assets/calculations/calculateAvg';
import { totalTurnAround, totalWaitingTime } from '../../assets/calculations/calculateTotal';

@Component({
  selector: 'app-psjf',
  template: `<h3>Preemptive Shortest Job First (PSJF)</h3>
  <app-cell *ngFor="let process of psjfprocess;" [myProcess]="process" [width]=getWidth(process.getBurstTime()) [last]="psjfprocess.length"></app-cell>`
})
export class PsjfComponent implements OnInit {

  totalBurstTime = 0;
  process: process[] = [];
  psjfprocess: process[] = [];
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
    this.result = psjf(this.process);
    this.psjfprocess = this.result.psjf;
    console.log(this.psjfprocess.length);
    this.totalBurstTime = this.psjfprocess.reduce((sum, p) => {
      return sum + p.getBurstTime();
    }, 0);
  }

  getWidth(bt: number) {
    return bt/this.totalBurstTime*100;
  } 

}
