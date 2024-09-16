import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  [x: string]: any;
  private tokenKey = 'authToken';
  private apiUrl = 'http://localhost:8080/users';
  

  constructor(private http: HttpClient, private router: Router) { }
 
  login(credentials: { email: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/login`, credentials, { headers }).pipe(
      tap(response => {
        const token = response.token;
        if (token) {
          this.setToken(token);  // Sla de JWT-token op
        }
      }),
      catchError((error) => {
        console.error('Login failed with error:', error);
        return throwError(error);
      })
    );
  }
  
  
     // Store the token in localStorage
     setToken(token: string): void {
      localStorage.setItem('authToken', token);
    }
  
    // Get the token from localStorage
    getToken(): string | null {
      return localStorage.getItem('authToken');
    }
  
    // Remove the token on logout
    logout(): void {
      localStorage.removeItem('authToken');
    }
    isLoggedIn(): boolean {
      return !!this.getToken();
    }
  
 // JWT-header genereren
 getAuthHeaders(): HttpHeaders {
  const token = this.getToken();
  return token ? new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }) : new HttpHeaders({
    'Content-Type': 'application/json'
  });
}
  
forgotPassword(email: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/forgot-password`, { email });
}
 
resetPassword(token: string, newPassword: string): Observable<any> {
  const requestBody = { token, password: newPassword }; 
  return this.http.post(`${this.apiUrl}/reset-password`, requestBody);
}
  
 
  decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload); 
    return JSON.parse(decodedPayload);
  }
  isTokenExpired(token: string): boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
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
  
  
 
  getCurrentUser(): any {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken ? { email: decodedToken.email, name: decodedToken.name } : null;
    }
    return null;
  }
  
  



  
  
}



