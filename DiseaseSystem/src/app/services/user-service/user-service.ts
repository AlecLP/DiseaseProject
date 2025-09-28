import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { LoginRequest } from '../../models/login/login-request.model';
import { LoginResponse } from '../../models/login/login-response.model';
import { UserDetails } from '../../models/login/user-details.model';
import { JwtPayload } from '../../models/jwt/jwt-payload.mode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loginUrl = 'http://localhost:9000/user/api/login'
  private registerUrl = 'http://localhost:9000/user/api/register'
  private loginStatus$ = new BehaviorSubject<boolean>(this.hasUser())
  isLoggedIn$ = this.loginStatus$.asObservable()

  constructor(private httpClient: HttpClient){

  }

  login(credentials: LoginRequest): Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(this.loginUrl, credentials).pipe(
      tap((res: LoginResponse) => {
        localStorage.setItem('token', res.token)
        this.loginStatus$.next(true)
      })
    )
  }

  register(userDetails: UserDetails): Observable<RegisterResponse>{
    return this.httpClient.post<RegisterResponse>(this.registerUrl, userDetails)
  }

  private hasUser(): boolean {
    return !!localStorage.getItem('token');
  }
  
  logout(): void {
    localStorage.removeItem('token');
    this.loginStatus$.next(false)
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  get role(): string | null {
    if (!this.token) return null;
    try {
      const decoded = jwtDecode<JwtPayload>(this.token);
      return decoded.role;
    } catch {
      return null;
    }
  }
}
