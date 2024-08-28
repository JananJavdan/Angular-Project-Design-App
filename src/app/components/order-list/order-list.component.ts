import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.model';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatInputModule,],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  filterText: string = '';
  sortField: string = 'date';
  isLoading: boolean = true;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.orderService.getOrders().subscribe(
      (data: Order[]) => {
        this.orders = data;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error loading orders', error);
        this.isLoading = false;
      }
    );
  }

  filterOrders(): Order[] {
    return this.orders.filter(order =>
      order.customerName.includes(this.filterText) ||
      order.status.includes(this.filterText)
    );
  }

  sortOrders(field: keyof Order): void {
    this.sortField = field;
    this.orders.sort((a, b) => {
      let comparison = 0;
  
      switch (field) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'totalPrice':
          comparison = a.totalPrice - b.totalPrice;
          break;
        // Voeg hier andere velden toe die je wilt sorteren
        default:
          comparison = 0;
      }
  
      return comparison;
    });
  }
  

  deleteOrder(orderId: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(orderId).subscribe(() => {
        this.loadOrders();
      });
    }
  }
}
