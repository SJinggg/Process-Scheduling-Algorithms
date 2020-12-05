import { Component, Input, OnInit } from '@angular/core';
import fcfs from '../../assets/algorithms/fcfs';
import process from '../../assets/process';

@Component({
  selector: 'app-fcfs',
  template: `
  <h3>First Come First Serve (FCFS)</h3>
  <app-cell *ngFor="let process of fcfsprocess;" [myProcess]="process" [width]=getWidth(process.getBurstTime()) [last]="fcfsprocess.length"></app-cell>
  <div class="mt-4 text-info" data-toggle="collapse" href="#summaryTablefcfs" role="button" aria-expanded="false" aria-controls="summaryTablenpp">View Summary Table&#9660;</div>
  <div class="collapse" id="summaryTablefcfs">
    <app-summary-table [myprocess]="calprocess"></app-summary-table>
  </div>
  `
})

export class FCFSComponent implements OnInit {

  totalBurstTime = 0;
  process: process[] = [];
  fcfsprocess: process[] = [];
  calprocess: process[] = [];

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
    this.fcfsprocess = fcfs(this.process).fcfsPro;
    this.calprocess = fcfs(this.process).sortedFcfs;
    this.totalBurstTime = this.fcfsprocess.reduce((sum, p) => {
      return sum + p.getBurstTime();
    }, 0);
  }

  getWidth(bt: number) {
    return bt/this.totalBurstTime*100;
  } 

}
