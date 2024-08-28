import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatInputModule,  MatCardModule, MatFormFieldModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent implements OnInit{
  customer: Customer = {
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    registrationDate: new Date().toISOString(),
  };
  isEditMode = false;
cancel: any;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.customerService.getCustomerById(+id).subscribe((customer) => {
        this.customer = customer;
      });
    }
  }
  onSubmit(): void {
    if (this.isEditMode) {
      this.customerService.updateCustomer(this.customer.id!, this.customer)
        .subscribe(() => this.router.navigate(['/customers']));
    } else {
      this.customerService.createCustomer(this.customer)
        .subscribe(() => this.router.navigate(['/customers']));
    }
  }

}
