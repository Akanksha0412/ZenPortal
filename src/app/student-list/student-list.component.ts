import { Component, OnInit } from '@angular/core';
import { student } from '../modal';
import { StudentServiceService } from '../student-service.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  studentList:Array<student> = [];
  constructor(private studentService:StudentServiceService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.studentService.getAll().subscribe((data) =>{
      this.studentList=data;
    })
  }

  deleteData(id:any){
    this.studentService.deleteById(id).subscribe((data)=>{
      this.loadData();
    })
  }
}
