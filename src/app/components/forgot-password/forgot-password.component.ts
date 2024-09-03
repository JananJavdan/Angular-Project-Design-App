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
      () => {
        alert('An email has been sent with instructions to reset your password.');
        this.router.navigate(['/login']);
      },
      (error) => {
        alert('There was an error sending the email. Please try again later.');
      }
    );
  }
  
}
