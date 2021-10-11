import { Component, OnInit } from '@angular/core';
import { multi } from '../data';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { attendance, chartData } from '../modal';
import { AttendService } from '../attend.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  view: [number,number] = [700, 300];
  fill: Array<chartData>=[];
  mainData: Array<attendance>=[];
  temp3: Array<chartData>=[];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Dates';
  showYAxisLabel = true;
  yAxisLabel = 'Number of Students';

  colorScheme = {
    // domain: ['red', 'blue', 'yellow', 'green', 'pink', 'black']
  };

  constructor(private attend:AttendService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.attend.getAll().subscribe((data) =>{
      data.sort()
      data.forEach((temp1)=>{
        let count=0;
        temp1.present.forEach((temp2)=>{
          count++;
        })
        this.temp3.push({"name":temp1.date, "value":count})
      })
    })
    this.fill=this.temp3;
    console.log(this.fill);
  }
}
