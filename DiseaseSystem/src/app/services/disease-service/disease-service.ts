import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DiseaseDetails } from '../../models/disease/disease-details.model';
import { DiseaseResponse } from '../../models/disease/disease-response.model';

@Injectable({
  providedIn: 'root'
})
export class DiseaseService {

  private diseaseSaveUrl: string = 'http://localhost:9000/disease/api/save'

  constructor(private httpClient: HttpClient){

  }

  saveDisease(diseaseDetails: DiseaseDetails){
    return this.httpClient.post<DiseaseResponse>(this.diseaseSaveUrl, diseaseDetails, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
  }
  
}
