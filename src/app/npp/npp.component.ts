import { Component, Input, OnInit } from '@angular/core';
import npp from '../../assets/algorithms/npp';
import process from '../../assets/process';
import { avgTurnAround, avgWaitingTime } from '../../assets/calculations/calculateAvg';
import { totalTurnAround, totalWaitingTime } from '../../assets/calculations/calculateTotal';

@Component({
  selector: 'app-npp',
  template: `<h3>Non-Preemptive Priority (NPP)</h3>
  <app-cell *ngFor="let process of nppprocess;" [myProcess]="process" [width]=getWidth(process.getBurstTime()) [last]="nppprocess.length"></app-cell>`
})
export class NppComponent implements OnInit {
  
  totalBurstTime = 0;
  process: process[] = [];
  nppprocess: process[] = [];

  @Input() myProcess: any;

  constructor() { }

  ngOnInit(): void {
    this.generateProcess();
    this.calculateNPP();
  }

  generateProcess() {
    this.myProcess.processes.forEach((p: { name: string; start: number; burst: number; priority: number; color: any; }) => {
      this.process.push(new process(p.name, p.start, p.priority, p.burst, p.color))
    })
  }

  calculateNPP() {
    this.nppprocess = npp(this.process);
    this.totalBurstTime = this.nppprocess.reduce((sum, p) => {
      return sum + p.getBurstTime();
    }, 0);
  }

  getWidth(bt: number) {
    return bt/this.totalBurstTime*100;
  } 

}
