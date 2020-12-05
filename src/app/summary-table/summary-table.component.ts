import { Component, Input, OnInit } from '@angular/core';
import process from '../../assets/process';
import { avgTurnAround, avgWaitingTime } from '../../assets/calculations/calculateAvg';
import { totalTurnAround, totalWaitingTime } from '../../assets/calculations/calculateTotal';

@Component({
  selector: 'app-summary-table',
  template: `<table class="table table-responsive table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Arrival Time</th>
      <th scope="col">Burst Time</th>
      <th scope="col">Finish Time</th>
      <th scope="col">Turnaround Time</th>
      <th scope="col">Waiting Time</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let process of myprocess; let index = index">
      <td>{{process.getProcessName()}}</td>
      <td>{{process.getArrivalTime()}}</td>
      <td>{{process.getBurstTime()}}</td>
      <td>{{process.getEndTime()}}</td>
      <td>{{process.getTurnAround()}}</td>
      <td>{{process.getWaitTime()}}</td>
    </tr>
    <tr>
      <td class="font-italic font-weight-bold" colspan="4" scope="row" style="text-align: right">Total:</td>
      <td>{{totalTA}}</td>
      <td>{{totalWT}}</td>
    </tr>
    <tr>
      <td class="font-italic font-weight-bold" colspan="4" scope="row" style="text-align: right">Average:</td>
      <td>{{avgTA}}</td>
      <td>{{avgWT}}</td>
    </tr>
  </tbody>
</table>`
})

export class SummaryTableComponent implements OnInit {

  @Input() myprocess: process[] | undefined;
  totalTA: number = 0;
  totalWT: number = 0;
  avgTA: number = 0;
  avgWT: number = 0;

  constructor() { }

  ngOnInit(): void {
    if(this.myprocess){
      this.totalTA = totalTurnAround(this.myprocess);
      this.totalWT = totalWaitingTime(this.myprocess);
      this.avgWT = avgWaitingTime(this.myprocess);
      this.avgTA = avgTurnAround(this.myprocess)
    }
  }

}
