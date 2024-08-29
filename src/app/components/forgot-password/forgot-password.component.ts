import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.email) {
      this.authService.forgotPassword(this.email).subscribe(
      () => {
        // Logica na succesvolle verzending, zoals navigeren naar een succespagina
        alert('Password reset email sent');
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Error sending password reset email', error);
      }
    );
  }

  }
}
