import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fcfs',
  template: `
  <h3>First Come First Serve (FCFS)</h3>
  <div class="progress">
    <div class="progress-bar" role="progressbar" style="background-color: #000000; width: 15%" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="progress-bar" role="progressbar" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
    <div class="progress-bar" role="progressbar" style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
  </div>`,
  styleUrls: ['./fcfs.component.css']
})
export class FCFSComponent implements OnInit {

  @Input() myProcess: any;

  constructor() { }

  ngOnInit(): void {
  }

}
