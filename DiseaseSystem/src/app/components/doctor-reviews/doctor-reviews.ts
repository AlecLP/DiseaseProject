import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../services/doctor-review-service/review-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-doctor-reviews',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './doctor-reviews.html',
  styleUrl: './doctor-reviews.css'
})
export class DoctorReviews implements OnInit {
  doctorId!: string;
  reviews$!: Observable<any[]>;
  reviewForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private reviewService: ReviewService
  ) {}

  ngOnInit() {
    this.doctorId = this.route.snapshot.paramMap.get('doctorId')!;
    this.reviews$ = this.reviewService.findReviews(this.doctorId);
  
    this.reviewForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      review: ['', Validators.required]
    });
  }

  submitReview() {
    if (this.reviewForm.valid) {
      const payload = { doctorId: this.doctorId, ...this.reviewForm.value };
      this.reviewService.saveReview(payload).subscribe({
        next: () => {
          this.reviews$ = this.reviewService.findReviews(this.doctorId);
          this.reviewForm.reset();
        },
        error: (err) => console.error(err)
      });
    }
  }
}
