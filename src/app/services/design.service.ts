import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Design } from '../models/design.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DesignService {
  getAllDesigns() {
    throw new Error('Method not implemented.');
  }
  private baseUrl = 'http://localhost:8080/designs';
  apiUrl: any;

  constructor(private http: HttpClient) { }

  getDesigns(): Observable<Design[]> {
    return this.http.get<Design[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }


  getDesignById(id: number): Observable<Design> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Design>(url).pipe(
      catchError(this.handleError)
    );
  }

  createDesign(design: Design): Observable<Design> {
    return this.http.post<Design>(this.apiUrl, design).pipe(
      catchError(this.handleError)
    );
  }

  updateDesign(id: number, design: Design): Observable<Design> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Design>(url, design).pipe(
      catchError(this.handleError)
    );
  }

  deleteDesign(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
}

