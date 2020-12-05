import { Component, Input, OnInit } from '@angular/core';
import rr from '../../assets/algorithms/rr';
import process from '../../assets/process';
import { avgTurnAround, avgWaitingTime } from '../../assets/calculations/calculateAvg';
import { totalTurnAround, totalWaitingTime } from '../../assets/calculations/calculateTotal';

@Component({
  selector: 'app-rr',
  template: `<h3>Round Robbin</h3>
  <app-cell *ngFor="let process of rrprocess;" [myProcess]="process" [width]=getWidth(process.getBurstTime()) [last]="rrprocess.length"></app-cell>`
})
export class RrComponent implements OnInit {

  totalBurstTime = 0;
  process: process[] = [];
  rrprocess: process[] = [];
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
    this.result = rr(this.process, this.myProcess.rr);
    this.rrprocess = this.result.rr;
    console.log(this.rrprocess.length);
    this.totalBurstTime = this.rrprocess.reduce((sum, p) => {
      return sum + p.getBurstTime();
    }, 0);
  }

  getWidth(bt: number) {
    return bt/this.totalBurstTime*100;
  } 

}
