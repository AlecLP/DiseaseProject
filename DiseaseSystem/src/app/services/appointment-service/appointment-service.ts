import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentDetails } from '../../models/appointment/appointment-details.model';
import { AppointmentResponse } from '../../models/appointment/appointment-response.model';
import { AppointmentPatientDiseaseDetails } from '../../models/appointment/appointment-patient-disease-details.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private appointmentSaveUrl: string = 'http://localhost:9000/appointment/api/save'
  private appointmentBaseUrl: string = 'http://localhost:9000/appointment/api'

  constructor(private httpClient: HttpClient){

  }

  saveAppointment(appointmentDetails: AppointmentDetails){
    return this.httpClient.post<AppointmentResponse>(this.appointmentSaveUrl, appointmentDetails, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
  }

  getLatestAppointmentInfo(){
    return this.httpClient.get<AppointmentPatientDiseaseDetails[]>(`${this.appointmentBaseUrl}/patient-latest-appointments`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
  }
  
}
