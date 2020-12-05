import { Component, Input, OnInit } from '@angular/core';
import npp from '../../assets/algorithms/npp';
import process from '../../assets/process';

@Component({
  selector: 'app-npp',
  template: `<h3>Non-Preemptive Priority (NPP)</h3>
  <app-cell *ngFor="let process of nppprocess;" [myProcess]="process" [width]=getWidth(process.getBurstTime()) [last]="nppprocess.length"></app-cell>
  <div class="mt-4 text-info" data-toggle="collapse" href="#summaryTablenpp" role="button" aria-expanded="false" aria-controls="summaryTablenpp">View Summary Table&#9660;</div>
  <div class="collapse" id="summaryTablenpp">
    <app-summary-table [myprocess]="calprocess"></app-summary-table>
  </div>
  `
})
export class NppComponent implements OnInit {
  
  totalBurstTime = 0;
  process: process[] = [];
  nppprocess: process[] = [];
  calprocess: process[] = [];

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
    this.nppprocess = npp(this.process).nppPro;
    this.calprocess = npp(this.process).sortednpp;
    this.totalBurstTime = this.nppprocess.reduce((sum, p) => {
      return sum + p.getBurstTime();
    }, 0);
  }

  getWidth(bt: number) {
    return bt/this.totalBurstTime*100;
  } 

}
