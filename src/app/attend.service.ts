import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { attendance } from './modal';

@Injectable({
  providedIn: 'root'
})
export class AttendService {

  attendanceData:Array<attendance>=[];
  constructor(private http:HttpClient) { }

  saveAttendance(attendance:attendance){
    this.attendanceData.push(attendance);
    return this.http.post('https://615f3a6af7254d0017068067.mockapi.io/attendance',attendance);
  }

  getAll(){
    return this.http.get<Array<attendance>>(`https://615f3a6af7254d0017068067.mockapi.io/attendance`)
  }
}
