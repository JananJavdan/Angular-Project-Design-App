import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule], // Vergeet niet RouterModule toe te voegen
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
   

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}
 

  onSubmitEmail() {
    this.authService.forgotPassword(this.email).subscribe(
      (response) => {
        if (response && response.message) {
          alert(response.message);  // Use the message from the JSON response
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        if (error.error && error.error.message) {
          alert(error.error.message);  // Use the error message from the JSON response
        } else {
          alert('There was an error sending the email. Please try again later.');
        }
      }
    );
  }
}  
