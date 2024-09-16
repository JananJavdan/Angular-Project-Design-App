import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private users: User[] = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      phoneNumber: '1234567890',
      username: 'johndoe',
      role: 'admin',
      
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'janesmith@example.com',
      password: 'password123',
      phoneNumber: '9876543210',
      username: 'janesmith',
      role: 'admin',
    },
    {
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michaelbrown@example.com',
      password: 'password123',
      phoneNumber: '1231231234',
      username: 'michaelbrown',
      role: 'admin',
    },
    {
      firstName: 'Emily',
      lastName: 'Jones',
      email: 'emilyjones@example.com',
      password: 'password123',
      phoneNumber: '4567891230',
      username: 'emilyjones',
      role: 'admin',
    },
    {
      firstName: 'Chris',
      lastName: 'Johnson',
      email: 'chrisjohnson@example.com',
      password: 'password123',
      phoneNumber: '2345678901',
      username: 'chrisjohnson',
      role: 'admin',
    },
    {
      firstName: 'Sarah',
      lastName: 'Lee',
      email: 'sarahlee@example.com',
      password: 'password123',
      phoneNumber: '5678901234',
      username: 'sarahlee',
      role: 'admin',
    },
    {
      firstName: 'David',
      lastName: 'Taylor',
      email: 'davidtaylor@example.com',
      password: 'password123',
      phoneNumber: '8901234567',
      username: 'davidtaylor',
      role: 'admin',
    },
    {
      firstName: 'Sophia',
      lastName: 'White',
      email: 'sophiawhite@example.com',
      password: 'password123',
      phoneNumber: '3216549870',
      username: 'sophiawhite',
      role: 'admin',
    },
    {
      firstName: 'Daniel',
      lastName: 'Harris',
      email: 'danielharris@example.com',
      password: 'password123',
      phoneNumber: '7654321098',
      username: 'danielharris',
      role: 'admin',
    },
    {
      firstName: 'Olivia',
      lastName: 'Martinez',
      email: 'oliviamartinez@example.com',
      password: 'password123',
      phoneNumber: '4561237890',
      username: 'oliviamartinez',
      role: 'admin',
    }
  ];

  constructor() {}

  // Fetch all user profiles
  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  // Fetch a specific user by index
  getUserByIndex(index: number): Observable<User> {
    return of(this.users[index]);
  }

  // Update user profile data (for editing purposes)
  updateUser(index: number, updatedUser: User): void {
    this.users[index] = updatedUser;
  }
}
