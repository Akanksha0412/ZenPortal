import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { student } from './modal';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  studentData:Array<student> = [];

  constructor(private http : HttpClient) { }

  saveStudent(data:student){
    return this.http.post(`https://615f3a6af7254d0017068067.mockapi.io/students`,data)
  }

  getAll(){
    return this.http.get<Array<student>>(`https://615f3a6af7254d0017068067.mockapi.io/students`)
  }

  deleteById(id:number){
    return this.http.delete(`https://615f3a6af7254d0017068067.mockapi.io/students/${id}`)
  }

  getStudentById(id:number){
    return this.http.get<student>(`https://615f3a6af7254d0017068067.mockapi.io/students/${id}`)
  }

  updateStudent(id:number,studentdata:student){
    return this.http.put(`https://615f3a6af7254d0017068067.mockapi.io/students/${id}`,studentdata)
  }
}

