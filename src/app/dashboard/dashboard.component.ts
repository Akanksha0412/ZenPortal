import { Component, OnInit } from '@angular/core';
import { AttendService } from '../attend.service';
import { multi } from '../data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private attend:AttendService) { }

  ngOnInit(): void {
  }
}
