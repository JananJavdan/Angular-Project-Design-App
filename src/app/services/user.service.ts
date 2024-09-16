import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: any;
 
  private baseUrl = 'http://localhost:8080/users';
  private tokenKey = 'authToken';
   

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user);
  }
  confirmUser(token: string): Observable<string> {
    return this.http.get(`${this.baseUrl}/confirm`, { 
      params: { token }, 
      responseType: 'text' 
    });
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post('http://localhost:8080/forgot-password', { email });
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8080/reset-password', { token, password });
  }

  loginUser(credentials: { email: string, password: string }): Observable<string> {
    return this.http.post(`${this.baseUrl}/login`, credentials, { responseType: 'text' });
  }
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }
  getAllUsers(): Observable<User[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.get<User[]>(`${this.baseUrl}/admin/users`, { headers });
}

  getCurrentUserId(): number {
    return parseInt(localStorage.getItem('userId')!, 10);
  }
  getCurrentUser(): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.get<User>(`${this.baseUrl}/user-profile`, { headers });
  }
  getUserProfile(): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.get<User>(`${this.baseUrl}/user-profile`, { headers });
  }
 
  getCustomers(): Observable<User[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.get<User[]>(`${this.baseUrl}/customers`, { headers });
}

  
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  getSecuredData(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.get(`${this.baseUrl}/profile`, { headers });
  }
  
}

