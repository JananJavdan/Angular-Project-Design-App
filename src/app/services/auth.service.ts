import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  private tokenKey = 'authToken';
  private apiUrl = 'http://localhost:8080/users';
 

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post('/forgot-password', { email }, { observe: 'response' }).pipe(
      map((response: { status: number; body: any; }) => {
        if (response.status === 200) {
          return response.body;
        } else {
          throw new Error('Failed to send email');
        }
      })
    );
  }
  
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, newPassword });
  }
  decodeToken(token: string): any {
    return this['jwtHelper'].decodeToken(token);
  }
  isAdmin(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const decodedToken = this.decodeToken(token);
    return decodedToken.role === 'ADMIN';
  }

  isCustomer(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const decodedToken = this.decodeToken(token);
    return decodedToken.role === 'CUSTOMER';
  }
  
  

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
  getCurrentUser(): any {
    const token = this.getToken();
    if (token) {
     
      return { email: 'test@example.com', name: 'John Doe' }; // Dit is een mock, pas aan naar jouw realiteit
    }
    return null;
  }
  
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

