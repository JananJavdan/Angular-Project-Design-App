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

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') as string;
    if (!this.token) {
      alert('Ongeldige of ontbrekende token');
      this.router.navigate(['/forgot-password']);
    }
}

  onSubmitNewPassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Wachtwoorden komen niet overeen!');
      return;
    }

    this.authService.resetPassword(this.token, this.newPassword).subscribe(
      response => {
        alert(response);
        this.router.navigate(['/login']);
      },
      error => {
        alert(error.error); // Display the error message
        if (error.status === 400) {
          this.router.navigate(['/login']); // Redirect to login page on error
        }
      }
    );
    
  }
}