import { Component } from '@angular/core';
import { NonNullableFormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserDetails } from '../../models/login/user-details.model';
import { UserService } from '../../services/user-service/user-service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  userForm: FormGroup
  readonly roles = ['Admin', 'User', 'Doctor']
  message$ = new Subject<String>()

  constructor(private fb: NonNullableFormBuilder, private router: Router, private userService: UserService){
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    })
  }

  submit(){
    if(this.userForm.valid){
      const user: UserDetails = this.userForm.getRawValue()
      this.userService.register(user).subscribe({
        next: (res: RegisterResponse) => {
          console.log(res.message)
          this.router.navigate(['/login'])
        },
        error: (err) => {
          this.message$.next(err.error?.message || 'Register failed')
        }
      })
    }
  }
}
