import { ViewChild, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from './table/table.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Process-Scheduling-Algorithms';
  submitted = false;
  fcfs = true;
  npsjf = true;
  npp = true;
  psjf = true;
  pp = true;
  rr = true;

  @ViewChild(TableComponent) process: any;

  receiveMessage($event: any) {
    this.submitted = $event;
  }

  changeState($event: any) {
    let id:string = $event.target.id;
    
    if (id === "fcfs" || id === "npsjf" || id === "npp" || id === "psjf" || id === "pp" || id === "rr")
      this[id] = $event.target.checked;
  }

}
