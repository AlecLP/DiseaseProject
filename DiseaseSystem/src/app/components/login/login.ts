import { Component } from '@angular/core';
import { UserService } from '../../services/user-service/user-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginResponse } from '../../models/login/login-response.model';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username: string = ''
  password: string = ''
  message$ = new Subject<string>();

  constructor(private userService: UserService, private router: Router){

  }

  onLogin() {
    const credentials = { username: this.username, password: this.password }
    
    this.userService.login(credentials).subscribe({
      next: (res: LoginResponse) => {
        console.log('Login successful')
        this.router.navigate(['/'])
      },
      error: (err) => {
        console.error('Login failed:', err.error.message)
        this.message$.next(err.error.message || 'Login Failed')
      }
    });
  }

}
