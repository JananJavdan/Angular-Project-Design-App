import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'authToken';
  private apiUrl = 'http://localhost:8080/users';
  private apiUrlForgetPassword = 'http://localhost:8080/forgot-password';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }
  resetPassword(token: string, newPassword: string) {
    return this.http.post('/api/reset-password', { token, newPassword });
  }
  
  

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
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

