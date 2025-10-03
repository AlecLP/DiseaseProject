import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, take } from 'rxjs';
import { DiseaseDetails } from '../../models/disease/disease-details.model';
import { DoctorDetails } from '../../models/doctor/doctor-details.model';
import { DiseaseService } from '../../services/disease-service/disease-service';
import { DoctorService } from '../../services/doctor-service/doctor-service';
import { jwtDecode } from 'jwt-decode';
import { AppointmentService } from '../../services/appointment-service/appointment-service';
import { AppointmentDetails } from '../../models/appointment/appointment-details.model';
import { JwtPayload } from '../../models/jwt/jwt-payload.mode';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointment',
  imports: [CommonModule, FormsModule],
  templateUrl: './appointment.html',
  styleUrl: './appointment.css'
})
export class Appointment implements OnInit {
  diseases$!: Observable<DiseaseDetails[]>
  diseases: DiseaseDetails[] = []
  doctors: DoctorDetails[] = []

  selectedDisease?: DiseaseDetails
  selectedDoctor?: DoctorDetails
  selectedDay?: string

  constructor(
    private diseaseService: DiseaseService,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.diseases$ = this.diseaseService.getAllDiseases();
    this.diseases$.subscribe(d => this.diseases = d); // keep a local copy
  }

  onDiseaseSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const id = target.value;

    this.selectedDisease = this.diseases.find(d => d._id === id);
    if (this.selectedDisease) {
      this.doctorService.getDoctorsBySpecialty(this.selectedDisease.category).subscribe({
        next: (data) => {
          this.doctors = data;
          this.cdRef.detectChanges()
        },
        error: (err) => {
          console.error('Error loading doctors:', err);
        }
      });
    }
  }

  onDoctorSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const id = target.value;
    this.selectedDoctor = this.doctors.find(doc => doc._id === id);
  }

  scheduleAppointment(): void {
    if (!this.selectedDoctor || !this.selectedDay || !this.selectedDisease) {
      alert('Please select all fields.');
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to schedule an appointment.');
      return;
    }
  
    let decoded: any;
    try {
      decoded = jwtDecode<JwtPayload>(token);
    } catch (err) {
      console.error('JWT decode error', err);
      alert('Authentication error — please log in again.');
      return;
    }
  
    const appointment: AppointmentDetails = {
      diseaseId: this.selectedDisease._id!,
      doctorId: this.selectedDoctor._id!,
      day: this.selectedDay!,
      userId: decoded._id
    };
  
    this.appointmentService.saveAppointment(appointment)
      .pipe(take(1))
      .subscribe({
        next: () => {
          alert('Appointment scheduled!');
          this.selectedDisease = undefined;
          this.selectedDoctor = undefined;
          this.doctors = [];
          this.selectedDay = undefined;
          this.router.navigate(['/payment'])
        },
        error: (err) => {
          console.error('Failed to schedule appointment', err);
          alert('Failed to schedule appointment. Please try again.');
        }
      });
  }
}