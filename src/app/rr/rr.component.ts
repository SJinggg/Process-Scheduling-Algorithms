import { Component, Input, OnInit } from '@angular/core';
import rr from '../../assets/algorithms/rr';
import process from '../../assets/process';

@Component({
  selector: 'app-rr',
  template: `<h3>Round Robbin</h3>
  <app-cell *ngFor="let process of rrprocess;" [myProcess]="process" [width]=getWidth(process.getBurstTime()) [last]="rrprocess.length"></app-cell>
  <div class="mt-4 text-info" data-toggle="collapse" href="#summaryTablerr" role="button" aria-expanded="false" aria-controls="summaryTablerr">View Summary Table&#9660;</div>
  <div class="collapse" id="summaryTablerr">
    <app-summary-table [myprocess]="calprocess"></app-summary-table>
  </div>
  `
})
export class RrComponent implements OnInit {

  totalBurstTime = 0;
  process: process[] = [];
  rrprocess: process[] = [];
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
    this.rrprocess = rr(this.process, this.myProcess.rr).rr;
    this.calprocess = rr(this.process, this.myProcess.rr).rrPro
    console.log(this.rrprocess.length);
    this.totalBurstTime = this.rrprocess.reduce((sum, p) => {
      return sum + p.getBurstTime();
    }, 0);
  }

  getWidth(bt: number) {
    return bt/this.totalBurstTime*100;
  } 

}
