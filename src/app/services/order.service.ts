import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8080/orders';


  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders`);
  }

  
   getOrderById(id: number): Observable<Order> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Order>(url, {
      withCredentials: true
    });
  }

 
   updateOrder(id: number, order: Order): Observable<Order> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Order>(url, order, {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

 
    deleteOrder(id: number): Observable<void> {
      const url = `${this.baseUrl}/${id}`;
      return this.http.delete<void>(url, {
        withCredentials: true
      });
    }
 

  

}

