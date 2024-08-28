import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatInputModule, RouterModule,],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  password: string = '';
  confirmPassword: string = '';
address: any;
registrationDate: any;

  constructor(private userService: UserService, private router: Router) {}

  onRegister() {
    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const user = {
      name: `${this.firstName} ${this.lastName}`,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber,
      address: this.address, // Nieuw veld
      registrationDate: this.registrationDate,
      role: 'CUSTOMER' 
      
    };

    this.userService.registerUser(user).subscribe(
      response => {
        console.log('Server response:', response);
        alert(response);
        this.router.navigate(['/login']);
      },
      error => {
        console.log('Error response:', error);
        if (error.status === 400) {
          alert('Registration failed: ' + error.error);
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
    );
    
   
  }
}


