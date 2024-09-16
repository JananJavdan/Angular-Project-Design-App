import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UserProfileService } from '../../user-profile.service';
import { User } from '../../models/user.model';  // Adjust the path based on your project structure

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatCardModule, CommonModule, MatIconModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  editMode: boolean = false;
  selectedUser!: { username: string; firstName: string; lastName: string; email: string; password: string; phoneNumber: string; name: string; role?: string; };
editProfile() {
throw new Error('Method not implemented.');
}
deleteAccount() {
throw new Error('Method not implemented.');
}
  users: User[] = [];  // Array to hold the list of users
  currentUser: User | null = null;  // Currently selected user

  constructor(private userProfileService: UserProfileService) {}

  ngOnInit() {
    // Fetch all users from the UserProfileService
    this.userProfileService.getUsers().subscribe((users) => {
      this.users = users;  // Assign the fetched users to the array
    });
  }

  // Method to delete a user by index
  deleteUser(index: number): void {
    this.users.splice(index, 1);  // Remove the user from the array
    // Optionally, you can call the UserProfileService to persist the deletion
  }

  // Method to toggle edit mode and load the selected user for editing
  editUser(user: User): void {
    this.editMode = true;
    this.selectedUser = { 
      firstName: user.firstName, 
      lastName: user.lastName, 
      email: user.email, 
      password: user.password, 
      phoneNumber: user.phoneNumber, 
      username: user.username, 
      role: user.role,
      name: `${user.firstName} ${user.lastName}` // Voeg de 'name' eigenschap toe.
    }; // Clone the user to avoid modifying directly
  }
  



}