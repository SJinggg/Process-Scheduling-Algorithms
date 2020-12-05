import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FCFSComponent } from './fcfs/fcfs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GanttChartCellComponent } from './gantt-chart-cell/gantt-chart-cell.component';
import { NpsjfComponent } from './npsjf/npsjf.component';
import { NppComponent } from './npp/npp.component';
import { PsjfComponent } from './psjf/psjf.component';
import { PpComponent } from './pp/pp.component';
import { RrComponent } from './rr/rr.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FCFSComponent,
    GanttChartCellComponent,
    NpsjfComponent,
    NppComponent,
    PsjfComponent,
    PpComponent,
    RrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
