import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [ FormsModule, MatButtonModule, MatInputModule, MatCardModule, MatFormFieldModule, CommonModule],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent implements OnInit{
editCustomer() {
throw new Error('Method not implemented.');
}
deleteCustomer() {
throw new Error('Method not implemented.');
}
  customer?: Customer;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.customerService.getCustomerById(id).subscribe((customer) => {
      this.customer = customer;
    });
  }
}


