import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatInputModule, RouterModule, CommonModule ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  http: any;
  selectedRole: string = 'CUSTOMER'; // Default waarde

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {}

  onLogin() {
    const loginData = {
      email: this.email,
      password: this.password,
      role: this.selectedRole.toUpperCase() 
    };
    
  
    this.authService.login(loginData).subscribe(
      (token: string) => {
        this.authService.setToken(token);
        alert('Login successful!');
        this.router.navigate(['/dashboard']);
      },
      error => {
        console.error('Login failed', error);
        alert('Login failed. Please check your credentials and try again.');
      }
    );
    
  }
}  

