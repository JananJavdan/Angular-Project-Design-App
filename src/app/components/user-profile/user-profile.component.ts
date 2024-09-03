import { Component, OnInit } from '@angular/core';
import { DesignService } from '../../services/design.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatCardModule, CommonModule, MatIconModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
editProfile: any;
deleteAccount: any;
  router: any;

deleteUser(userId: number): void {
  this.userService.deleteUser(userId).subscribe(() => {
    this.allUsers = this.allUsers.filter((user: { id: number; }) => user.id !== userId);
  });
}

allUsers: any;
createNewUser(): void {
  
  this.router.navigate(['/admin/create-user']);
}

viewAllUsers(): void {
  this.userService.getAllUsers().subscribe(
    (data: User[]) => {
      this.allUsers = data;
    },
    (error) => {
      console.error('Error loading users', error);
    }
  );
}
  customers!: User[];
  isAdminUser: boolean = false;
  isCustomerUser: boolean = false;
  customer!: User;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdminUser = this.authService.isAdmin();
    this.isCustomerUser = this.authService.isCustomer();

    if (this.isCustomerUser) {
      this.loadCustomer();
    } else if (this.isAdminUser) {
      this.viewAllUsers();
    }
  }
  
  loadCustomer(): void {
    this.userService.getCurrentUser().subscribe(
      (data: User) => {
        this.customer = data;
      },
      (error) => {
        console.error('Error loading customer', error);
      }
    );
  }
  contactUser(email: string): void {
    window.location.href = `mailto:${email}`;
  }

  getRandomColor(): string {
    const colors = ['#ff6b6b', '#1dd1a1', '#54a0ff', '#f368e0']; 
    return colors[Math.floor(Math.random() * colors.length)];
  }

  logout(): void {
    this.userService.logout();
  }
}
