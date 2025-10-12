import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountStats } from '../../models/stats/count-stats.model';
import { DiseaseStats } from '../../models/stats/disease-stats.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private baseUrl = 'http://localhost:9000/statistics/api';

  constructor(private http: HttpClient) {}

  getCounts(): Observable<CountStats> {
    return this.http.get<CountStats>(`${this.baseUrl}/counts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    });
  }

  getCommonDiseases(): Observable<DiseaseStats[]> {
    return this.http.get<DiseaseStats[]>(`${this.baseUrl}/common-diseases`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    });
  }
  
}
