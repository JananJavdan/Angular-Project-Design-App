import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit{
  customers: Customer[] = [];
  isLoading = true;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();

}
loadCustomers(): void {
  this.customerService.getAllCustomers().subscribe(
    (data: Customer[]) => {
      this.customers = data;
      this.isLoading = false;
    },
    (error: any) => {
      console.error('Failed to load customers', error);
      this.isLoading = false;
    }
  );
}

deleteCustomer(id: number): void {
  this.customerService.deleteCustomer(id).subscribe(() => {
    this.customers = this.customers.filter((customer) => customer.id !== id);
  });
}
}
