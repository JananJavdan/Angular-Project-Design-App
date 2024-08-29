import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  newPassword: string = '';
  token: string | null = '';

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  onSubmit() {
    if (this.token) {
      this.authService.resetPassword(this.token, this.newPassword).subscribe(() => {
        alert('Password has been reset successfully');
        this.router.navigate(['/login']);
      }, (error: { message: string; }) => {
        alert('Failed to reset password: ' + error.message);
      });
    } else {
      alert('Invalid token');
    }
  }

}
