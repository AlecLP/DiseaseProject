import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { UserService } from '../../services/user-service/user-service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  isLoggedIn$!: Observable<boolean>;

  constructor(private userService: UserService, private router: Router) {
    this.isLoggedIn$ = this.userService.isLoggedIn$;
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login'])
  }
}
