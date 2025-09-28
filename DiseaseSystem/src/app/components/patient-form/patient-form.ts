import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { PatientService } from '../../services/patient-service/patient-service';
import { PatientDetails } from '../../models/patient/patient-details.model';
import { PatientResponse } from '../../models/patient/patient-response.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './patient-form.html',
  styleUrl: './patient-form.css'
})
export class PatientForm {

  patientForm: FormGroup
  message$ = new Subject<String>()

  constructor(private fb: NonNullableFormBuilder, private patientService: PatientService){
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      symptoms: ['', Validators.required]
    })
  }

  submit(){
    if(this.patientForm.valid){
      const patient: PatientDetails = this.patientForm.getRawValue()
      this.patientService.saveDisease(patient).subscribe({
        next: (res: PatientResponse) => {
          console.log(res.message)
        },
        error: (err) => {
          this.message$.next(err.error?.message || 'Saving patient failed')
        }
      })
    }
  }

}
