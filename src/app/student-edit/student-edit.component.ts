import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { student } from '../modal';
import { StudentServiceService } from '../student-service.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  id:number = 0;
  studentForm:FormGroup
  constructor(private activeRoute:ActivatedRoute, private studentService:StudentServiceService, private router:Router) {
    this.studentForm = new FormGroup({
      'roll' : new FormControl('',Validators.required),
      'name':new FormControl('',Validators.required),
      'email':new FormControl('',[Validators.required, Validators.email]),
      'phoneNumber':new FormControl('',[Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'track':new FormControl('',Validators.required)
    })

   }

  ngOnInit(): void {
      this.activeRoute.params.subscribe((paramsData)=>{
      this.id=paramsData.id;
      this.studentService.getStudentById(paramsData.id).subscribe((data:student)=>{
        console.log(data)
        delete data.id

        this.studentForm.patchValue(data);
      })
    })
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
      this.studentService.updateStudent(this.id,this.studentForm.value).subscribe(()=>{
        alert("Succesfully Updated");
      },()=>{
        alert("Something Went Wrong");
      })
    }
  }
}
