import { Component, Input, OnInit } from '@angular/core';
import fcfs from '../../assets/algorithms/fcfs';
import process from '../../assets/process';
import { avgTurnAround, avgWaitingTime } from '../../assets/calculations/calculateAvg';
import { totalTurnAround, totalWaitingTime } from '../../assets/calculations/calculateTotal';

@Component({
  selector: 'app-fcfs',
  template: `
  <h3>First Come First Serve (FCFS)</h3>
  <app-cell *ngFor="let process of fcfsprocess;" [myProcess]="process" [width]=getWidth(process.getBurstTime()) [last]="fcfsprocess.length"></app-cell>`,
  styleUrls: ['./fcfs.component.css']
})
// 
export class FCFSComponent implements OnInit {

  processed = false;
  totalBurstTime = 0;

  process: process[] = [];
  fcfsprocess: process[] = [];

  @Input() myProcess: any;

  constructor() { }

  ngOnInit(): void {
    this.generateProcess();
    this.calculateFCFS();
  }

  generateProcess() {
    this.myProcess.processes.forEach((p: { name: string; start: number; burst: number; priority: number; color: any; }) => {
      this.process.push(new process(p.name, p.start, p.priority, p.burst, p.color))
    })
  }

  calculateFCFS() {
    this.fcfsprocess = fcfs(this.process);
    this.totalBurstTime = this.fcfsprocess.reduce((sum, p) => {
      return sum + p.getBurstTime();
    }, 0);
    this.processed = true;
  }

  getWidth(bt: number) {
    return bt/this.totalBurstTime*100;
  } 

}
