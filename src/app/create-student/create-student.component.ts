import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentServiceService } from '../student-service.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {
  studentForm:FormGroup
  constructor(private studentService:StudentServiceService, private router:Router) {
    this.studentForm = new FormGroup({
      'roll' : new FormControl('',Validators.required),
      'name':new FormControl('',Validators.required),
      'email':new FormControl('',[Validators.required, Validators.email]),
      'phoneNumber':new FormControl('',[Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'track':new FormControl('',Validators.required)
    });
   }

  ngOnInit(): void {
  }
  submit(){
    Object.keys(this.studentForm.controls).forEach(field => {
      const control=this.studentForm.get(field);
      if(control instanceof FormControl)
      {
        control.markAsTouched({onlySelf:true});
      }
    });
    if(this.studentForm.valid){
      console.log(this.studentForm.value);
      this.studentService.saveStudent(this.studentForm.value).subscribe(()=>{
        this.router.navigate(['/student-list'])
      },()=>{
        alert("Something Went Wrong");
      })
    }
  }
}
