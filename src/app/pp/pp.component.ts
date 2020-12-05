import { Component, Input, OnInit } from '@angular/core';
import pp from '../../assets/algorithms/pp';
import process from '../../assets/process';

@Component({
  selector: 'app-pp',
  template: `<h3>Preemptive Priority (PP)</h3>
  <app-cell *ngFor="let process of ppprocess;" [myProcess]="process" [width]=getWidth(process.getBurstTime()) [last]="ppprocess.length"></app-cell>
  <div class="mt-4 text-info" data-toggle="collapse" href="#summaryTablepp" role="button" aria-expanded="false" aria-controls="summaryTablepp">View Summary Table&#9660;</div>
  <div class="collapse" id="summaryTablepp">
    <app-summary-table [myprocess]="calprocess"></app-summary-table>
  </div>
  `
})
export class PpComponent implements OnInit {

  totalBurstTime = 0;
  process: process[] = [];
  ppprocess: process[] = [];
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
    this.ppprocess = pp(this.process).pp;
    this.calprocess = pp(this.process).ppPro;
    console.log(this.ppprocess.length);
    this.totalBurstTime = this.ppprocess.reduce((sum, p) => {
      return sum + p.getBurstTime();
    }, 0);
  }

  getWidth(bt: number) {
    return bt/this.totalBurstTime*100;
  } 

}
