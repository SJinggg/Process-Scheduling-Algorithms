import { Component, OnInit } from '@angular/core';
import { faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  template: `
  <div>
    <button type="button" class="btn btn-outline-warning" (click)="addProcess()">+ Add New Process</button>
    <button *ngIf="processes.length > 0" type="button" class="btn btn-outline-success ml-2">Run</button>
  </div>
  <table class="table mt-2" *ngIf="processes.length > 0">
    <thead>
      <tr>
        <th scope="col">Process Name</th>
        <th scope="col">Arrival Time</th>
        <th scope="col">Burst Time</th>
        <th scope="col">Priority</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let process of processes; let index = index">
        <td>
          {{process.name}}
        </td>
        <td>
          <div class="form-group">
            <input type="text" class="form-control" id="start" [(ngModel)]="process.start" value={{process.start}}>
          </div>
          
          
        </td>
        <td>
          <div class="form-group">
            <input type="text" class="form-control" id="burst" [(ngModel)]="process.burst" value={{process.burst}}>
          </div>
        </td>
        <td>
          <div class="form-group">
            <input type="text" class="form-control" id="prior" [(ngModel)]="process.priority" value={{process.priority}}>
          </div>
        </td>
        <td>
          <button type='button' class="btn btn-outline-danger btn-sm" (click)="dltProcess(index)">
            <fa-icon [icon]="faTrash"></fa-icon>
          </button>
        </td>
      </tr>
    </tbody>
  </table>`,
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  processes: any[] = []
  faTrash = faTrash;

  constructor() {
  }

  ngOnInit(): void { }

  addProcess () {
    this.processes.push({
      name: ('P'+this.processes.length),
      start: null,
      burst: null,
      priority: null
    });
  }

  dltProcess(index: number) {
    this.processes.splice(index, 1);
  }

}
