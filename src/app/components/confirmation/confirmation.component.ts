import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit{
  message: string = '';

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.userService.confirmUser(token).subscribe(
        response => {
          this.message = 'Your email has been confirmed! You can now log in.';
        },
        error => {
          this.message = 'Invalid or expired confirmation token.';
        }
      );
    } else {
      this.message = 'No token provided.';
    }
  }
}


