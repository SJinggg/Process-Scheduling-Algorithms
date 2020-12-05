import { Component, Input, OnInit } from '@angular/core';
import npsjf from '../../assets/algorithms/npsjf';
import process from '../../assets/process';
import { avgTurnAround, avgWaitingTime } from '../../assets/calculations/calculateAvg';
import { totalTurnAround, totalWaitingTime } from '../../assets/calculations/calculateTotal';

@Component({
  selector: 'app-npsjf',
  template: `<h3>Non-Preemptive Shortest Job First (NPSJF)</h3>
  <app-cell *ngFor="let process of npsjfprocess;" [myProcess]="process" [width]=getWidth(process.getBurstTime()) [last]="npsjfprocess.length"></app-cell>
  <div class="mt-4 text-info" data-toggle="collapse" href="#summaryTablenpsjf" role="button" aria-expanded="false" aria-controls="summaryTablenpsjf">View Summary Table&#9660;</div>
  <div class="collapse" id="summaryTablenpsjf">
    <app-summary-table [myprocess]="calprocess"></app-summary-table>
  </div>
  `
})
export class NpsjfComponent implements OnInit {
  
  totalBurstTime = 0;
  process: process[] = [];
  npsjfprocess: process[] = [];
  calprocess: process[] = []

  @Input() myProcess: any;

  constructor() { }

  ngOnInit(): void {
    this.generateProcess();
    this.calculateNPSJF();
  }

  generateProcess() {
    this.myProcess.processes.forEach((p: { name: string; start: number; burst: number; priority: number; color: any; }) => {
      this.process.push(new process(p.name, p.start, p.priority, p.burst, p.color))
    })
  }

  calculateNPSJF() {
    this.npsjfprocess = npsjf(this.process).npsjfPro;
    this.calprocess = npsjf(this.process).sortednpsjf;
    this.totalBurstTime = this.npsjfprocess.reduce((sum, p) => {
      return sum + p.getBurstTime();
    }, 0);
  }

  getWidth(bt: number) {
    return bt/this.totalBurstTime*100;
  } 

}
