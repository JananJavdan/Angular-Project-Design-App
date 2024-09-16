import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatInputModule, FormsModule, CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  constructor(private router: Router, private http: HttpClient) {}
  onSubmit(contactForm: any) {
    if (contactForm.valid) {
      const formData = contactForm.value;

      this.http.post('http://localhost:8080/send-email', formData, { responseType: 'text' }).subscribe(
        response => {
          console.log('Email sent successfully:', response);
          alert(response);  // The response is plain text now, so alert it directly
        },
        error => {
          console.error('Error sending message:', error);
          alert('Failed to send the message. Please try again later.');
        }
      );
    } else {
      console.log('Form is invalid.');
    }
  }
}
