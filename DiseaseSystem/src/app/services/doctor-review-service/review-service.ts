import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private reviewBaseUrl = 'http://localhost:9000/review/api'
  constructor(private http: HttpClient) {}

  findReviews(doctorId: string) {
    return this.http.get<any[]>(`${this.reviewBaseUrl}/reviews/${doctorId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    });
  }

  saveReview(payload: any) {
    return this.http.post(`${this.reviewBaseUrl}/save`, payload, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    });
  }
}