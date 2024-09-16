import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Design } from '../models/design.model';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DesignService {
  private apiUrl = 'http://localhost:8080/designs';
 

 
  constructor(private http: HttpClient, private authService: AuthService) { }


  submitDesign(designData: any): Observable<Design> {
    return this.http.post<Design>(`${this.apiUrl}/submit`, designData);
  }
  
  getCustomerDesigns(): Observable<any> {
    return this.http.get(`${this.apiUrl}/my-designs`);
  }
  
  createDesign(formData: FormData) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.post('http://localhost:8080/designs/create', formData, { headers });
  }
  
  
  getAllDesigns() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.get<Design[]>('http://localhost:8080/designs', { headers });
  }

 

  
  deleteDesign(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  
  

} 