import { Component, Input, OnInit } from '@angular/core';
import psjf from '../../assets/algorithms/psjf';
import process from '../../assets/process';

@Component({
  selector: 'app-psjf',
  template: `<h3>Preemptive Shortest Job First (PSJF)</h3>
  <app-cell *ngFor="let process of psjfprocess;" [myProcess]="process" [width]=getWidth(process.getBurstTime()) [last]="psjfprocess.length"></app-cell>
  <div class="mt-4 text-info" data-toggle="collapse" href="#summaryTablepsjf" role="button" aria-expanded="false" aria-controls="summaryTablepsjf">View Summary Table&#9660;</div>
  <div class="collapse" id="summaryTablepsjf">
    <app-summary-table [myprocess]="calprocess"></app-summary-table>
  </div>
  `
})
export class PsjfComponent implements OnInit {

  totalBurstTime = 0;
  process: process[] = [];
  psjfprocess: process[] = [];
  calprocess: process[] = [];

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
    this.psjfprocess = psjf(this.process).psjf;
    this.calprocess = psjf(this.process).psjfPro;
    this.totalBurstTime = this.psjfprocess.reduce((sum, p) => {
      return sum + p.getBurstTime();
    }, 0);
  }

  getWidth(bt: number) {
    return bt/this.totalBurstTime*100;
  } 

}
