import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment-service/appointment-service';
import { Observable } from 'rxjs';
import { AppointmentPatientDiseaseDetails } from '../../models/appointment/appointment-patient-disease-details.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-summary',
  imports: [DatePipe, CommonModule],
  templateUrl: './summary.html',
  styleUrl: './summary.css'
})
export class Summary implements OnInit{
  summaryData$!: Observable<AppointmentPatientDiseaseDetails[]>;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.summaryData$ = this.appointmentService.getLatestAppointmentInfo();
  }
}
