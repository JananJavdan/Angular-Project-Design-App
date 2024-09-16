import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Retrieve the token from the URL query params
    this.token = this.route.snapshot.queryParams['token'];
  }

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    this.authService.resetPassword(this.token, this.newPassword).subscribe(
      response => {
        alert(response.message);  // Display the success message from the response
        this.router.navigate(['/login']);  // Navigate to the login page
      },
      error => {
        console.error('Error occurred:', error);
        alert('Error resetting password: ' + (error.error.message || 'Unknown error'));
      }
    );
  }
}