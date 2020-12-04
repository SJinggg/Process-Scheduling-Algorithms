import { Component, Input, OnInit } from '@angular/core';
import process from '../../assets/process';

@Component({
  selector: 'app-cell',
  template: `
  <span class="cell" style="background-color:{{myProcess.getColor()}}; width: {{width}}%;">
  <div class="start">
    <span>{{ myProcess.getStartTime() }}</span>
  </div>
  {{myProcess.getProcessName()}}
  <div *ngIf="checklast()" class="last">
    <span >{{ myProcess.getEndTime() }}</span>
  </div>
  </span>
  `,
  styleUrls: ['./gantt.component.css']
})

export class GanttChartCellComponent implements OnInit {

  @Input() myProcess: process | undefined;
  @Input() width: any;
  @Input() last: any;

  static count = 0;

  constructor() {
    GanttChartCellComponent.count = 0;
  }

  ngOnInit(): void {
    GanttChartCellComponent.count += 1;
    console.log(GanttChartCellComponent.count);
    console.log(this.last);
  }

  checklast() : boolean{
    return Number(this.last) === GanttChartCellComponent.count;
  }

}
