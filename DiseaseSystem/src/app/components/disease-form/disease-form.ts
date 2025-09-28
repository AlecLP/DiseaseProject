import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DiseaseService } from '../../services/disease-service/disease-service';
import { DiseaseDetails } from '../../models/disease/disease-details.model';
import { DiseaseResponse } from '../../models/disease/disease-response.model';

@Component({
  selector: 'app-disease-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './disease-form.html',
  styleUrl: './disease-form.css'
})
export class DiseaseForm {
  diseaseForm: FormGroup
  message$ = new Subject<String>()
  readonly severityOptions = ["Mild", "Moderate", "Severe"];

  constructor(private fb: NonNullableFormBuilder, private diseaseService: DiseaseService){
    this.diseaseForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      symptoms: ['', Validators.required],
      severity: ['', Validators.required]
    })
  }

  submit(){
    if(this.diseaseForm.valid){
      const disease: DiseaseDetails = this.diseaseForm.getRawValue()
      this.diseaseService.saveDisease(disease).subscribe({
        next: (res: DiseaseResponse) => {
          console.log(res.message)
        },
        error: (err) => {
          this.message$.next(err.error?.message || 'Saving disease failed')
        }
      })
    }
  }

}
