import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientDetails } from '../../models/patient/patient-details.model';
import { PatientResponse } from '../../models/patient/patient-response.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patientSaveUrl: string = 'http://localhost:9000/patient/api/save'

  constructor(private httpClient: HttpClient){

  }

  saveDisease(patientDetails: PatientDetails){
    return this.httpClient.post<PatientResponse>(this.patientSaveUrl, patientDetails, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
  }
  
}
