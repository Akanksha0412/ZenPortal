import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AttendService } from '../attend.service';
import { attendance, student } from '../modal';
import { StudentServiceService } from '../student-service.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  studentList:Array<student>=[];
  saved:boolean=false;
  todayDate=new Date().toISOString().slice(0,10);
  date=this.todayDate;
  attendanceForm:FormGroup;
  presentData:attendance={
    "date":"",
    "present":[]
  };
  presentStudents:Array<student>=[];

  constructor(private studentService:StudentServiceService, private attend:AttendService, private router:Router) {
    console.log(this.date)
    this.attendanceForm = new FormGroup({
      attendanceDate:new FormControl(),
    })
   }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.saved=false;
    this.presentStudents=[];
    this.studentService.getAll().subscribe((data)=>{
      this.studentList=data;
    })
  }

  changeDate(){
    this.loadData();
  }

  changeStatus(event:any,student:student){
    if(event.checked){
      this.presentStudents.push(student);
    }
    else{
      for(let i=0;i<this.presentStudents.length;i++)
      {
        if(this.presentStudents[i]==student)
        {
          this.presentStudents.splice(i,1);
          return;
        }
      }
    }
  }

  saveAttendance(){
    this.presentData={
      "date":this.date,
      "present": this.presentStudents
    }
    this.attend.saveAttendance(this.presentData).subscribe((data:any)=>{
      alert("Saved Attendance")
    },()=>{
      alert("Something Went Wrong")
    })
  }
}
