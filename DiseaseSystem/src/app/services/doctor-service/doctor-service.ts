import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DoctorDetails } from '../../models/doctor/doctor-details.model';
import { DoctorResponse } from '../../models/doctor/doctor-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private doctorSaveUrl = 'http://localhost:9000/doctor/api/save'
  private doctorBaseUrl = 'http://localhost:9000/doctor/api'
  constructor(private httpClient: HttpClient){

  }

  saveDoctor(doctorDetails: DoctorDetails){
    return this.httpClient.post<DoctorResponse>(this.doctorSaveUrl, doctorDetails, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
  }

  getDoctorsBySpecialty(specialty: string): Observable<DoctorDetails[]> {
    return this.httpClient.get<DoctorDetails[]>(`${this.doctorBaseUrl}/specialty/${specialty}`);
  }
}