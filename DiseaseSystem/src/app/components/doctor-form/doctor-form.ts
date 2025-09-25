import { Component } from '@angular/core';
import { NonNullableFormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { DoctorDetails } from '../../models/doctor/doctor-details.model';
import { DoctorService } from '../../services/doctor-service/doctor-service';
import { DoctorResponse } from '../../models/doctor/doctor-response.model';

@Component({
  selector: 'app-doctor-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './doctor-form.html',
  styleUrl: './doctor-form.css'
})
export class DoctorForm {
  doctorForm: FormGroup
  message$ = new Subject<String>()
  readonly daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  constructor(private fb: NonNullableFormBuilder, private doctorService: DoctorService){
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      contact: ['', Validators.required],
      specialty: ['', Validators.required],
      experience: [0, Validators.required],
      availability: this.fb.array([], Validators.required),
      fees: [0, Validators.required]
    })
  }

  get availabilityArray(): FormArray {
    return this.doctorForm.get('availability') as FormArray;
  }

  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.availabilityArray.push(this.fb.control(checkbox.value));
    } else {
      const index = this.availabilityArray.controls.findIndex(x => x.value === checkbox.value);
      this.availabilityArray.removeAt(index);
    }
  }

  submit(){
    console.log(this.doctorForm.value);
    if(this.doctorForm.valid){
      const doctor: DoctorDetails = this.doctorForm.getRawValue()
      this.doctorService.saveDoctor(doctor).subscribe({
        next: (res: DoctorResponse) => {
          console.log(res.message)
        },
        error: (err) => {
          this.message$.next(err.error?.message || 'Register failed')
        }
      })
    }
  }
}
