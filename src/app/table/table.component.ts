import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  template: `
  <div>
    <button type="button" class="btn btn-light" (click)="addProcess()">+ Add New Process</button>
    <button *ngIf="processes.length > 0 && !submitted" type="button" class="btn btn-outline-success ml-2" (click)=runProcess()>Run</button>
    <button *ngIf="submitted" type="button" class="btn btn-outline-danger ml-2" (click)=cancelProcess()>Stop</button>
    <label class="d-none d-md-block col-3" style="float: right; white-space: nowrap;">
      <span>Round Robbin Interval:</span>
      <input type="text" class="form-control" id="rr" [(ngModel)]="rr" value={{rr}}>
    </label>
    <div *ngIf="rrWarning" class="alert alert-danger alert-dismissible mt-2" role="alert">
    Round Robbin Interval value should be more than 0
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" (click)='getAlert=false'>
        <span aria-hidden="true">&times;</span>
      </button> 
    </div>
    <div class="d-md-none col-12 mt-2 p-0">
      <input type="text" placeholder="Round Robbin Interval" class="form-control" id="rr" [(ngModel)]="rr" value={{rr}}>
    </div>
  </div>
  <div *ngIf="getAlert" class="alert alert-danger alert-dismissible mt-2" role="alert">
    Make sure only numeric inputs.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close" (click)='getAlert=false'>
      <span aria-hidden="true">&times;</span>
    </button> 
  </div>
  <div *ngIf="getWarning" class="alert alert-warning alert-dismissible mt-2" role="alert">
    There is one or more empty input(s).
    <button type="button" class="close" data-dismiss="alert" aria-label="Close" (click)='getWarning=false'>
      <span aria-hidden="true">&times;</span>
    </button> 
  </div>
  <div class="table-responsive">
    <table class="table mt-2" *ngIf="processes.length > 0">
      <thead>
        <tr>
          <th scope="col">Process Name</th>
          <th scope="col">Arrival Time</th>
          <th scope="col">Burst Time</th>
          <th scope="col">Priority</th>
          <th scope="col">Color</th>
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
            <div style="background-color:{{process.color}}; padding: 15px; border: 1px solid black;">
            </div>
          </td>
          <td>
            <button type='button' class="btn btn-outline-danger btn-sm" (click)="dltProcess(index)">
              <fa-icon [icon]="faTrash"></fa-icon>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  <div>  
  `
})
export class TableComponent implements OnInit {
  processes: any[] = [];
  faTrash = faTrash;
  getAlert = false;
  getWarning = false;
  submitted = false;
  rr: number = 3;
  rrWarning = false;

  @Output() submitEvent = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void { }

  addProcess () {
    this.processes.push({
      name: ('P'+this.processes.length),
      start: null,
      burst: null,
      priority: null,
      color: this.getRandomColor()
    });
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  } 

  dltProcess(index: number) {
    this.processes.splice(index, 1);
  }

  runProcess () {
    if(this.rr < 1) {
      this.rrWarning = true;
    }
    else{
      this.rrWarning = false;
      this.processes.forEach((item) => {
        if((item.start) === null || item.burst === null || item.priority === null)
          this.getWarning = true;
        else if (/[a-z]/i.test(item.start) || /[a-z]/i.test(item.burst) || /[a-z]/i.test(item.priority)) {
          this.getAlert = true;
        }
        else{
          this.getWarning = false;
          this.getAlert = false;
          this.submitted = true;
          this.submitEvent.emit(this.submitted);
        }
      })
    }
  }

  cancelProcess () {
    this.submitted = false;
    this.submitEvent.emit(this.submitted);
  }

}
