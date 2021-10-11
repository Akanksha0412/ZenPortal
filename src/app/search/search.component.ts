import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AttendService } from '../attend.service';
import { student } from '../modal';
import { StudentServiceService } from '../student-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  presentStudentList:Array<student>=[];
  currDate = new Date().toISOString().slice(0,10);
  date = this.currDate;
  searchForm:FormGroup;
  constructor(private student:StudentServiceService,private attend:AttendService) { 
    this.searchForm=new FormGroup({
      attendanceDate:new FormControl()
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.presentStudentList=[];
    this.attend.getAll().subscribe((data:any)=>{

      data.forEach((student:any) => {
        if(student.date==this.date)
        {
          student.present.forEach((studentData:any) => {
            this.presentStudentList.push(studentData); 
          });
        }        
      });
    })
  }

  changeData(){
    this.loadData();
  }
}
