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

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    FCFSComponent,
    GanttChartCellComponent
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
