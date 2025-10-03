import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppointmentDetails } from '../../models/appointment/appointment-details.model';
import { AppointmentResponse } from '../../models/appointment/appointment-response.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private appointmentSaveUrl: string = 'http://localhost:9000/appointment/api/save'

  constructor(private httpClient: HttpClient){

  }

  saveAppointment(appointmentDetails: AppointmentDetails){
    return this.httpClient.post<AppointmentResponse>(this.appointmentSaveUrl, appointmentDetails, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
  }
  
}
