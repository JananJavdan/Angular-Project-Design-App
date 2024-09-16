import { Component, OnInit } from '@angular/core';
import { DesignService } from '../../services/design.service';
import { Design } from '../../models/design.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-designs',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './my-designs.component.html',
  styleUrls: ['./my-designs.component.css']
})
export class MyDesignsComponent implements OnInit {
  
  designs: Design[] = [];
  errorMessage: string = '';
  newDesign: Partial<Design> = {
    logo: '',
    color: '',
    font: '',
    text: ''
  };
  selectedFile: File | null = null;

  constructor(public router: Router, private designService: DesignService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadDesigns(); // Load designs when the component is initialized
  }

  // Handle design submission
  submitDesign(): void {
    const formData = new FormData();
    formData.append('text', this.newDesign.text || '');
    formData.append('color', this.newDesign.color || '');
    formData.append('font', this.newDesign.font || '');
    if (this.selectedFile) {
      formData.append('image', this.selectedFile); // Add the image if it exists
    }

    this.designService.createDesign(formData).subscribe(
      (response: any) => {
        console.log('Design submitted successfully', response);
        this.resetForm(); // Reset the form after submission
        this.loadDesigns(); // Reload the designs
      },
      (error: any) => {
        console.error('Failed to submit design', error);
        this.errorMessage = 'Failed to submit design';
      }
    );
  }

  // Load all designs from the server
  loadDesigns(): void {
    this.designService.getAllDesigns().subscribe(
      (data: Design[]) => {
        this.designs = data; // Set the fetched designs to the component's designs array
      },
      (error) => {
        console.error('Failed to load designs', error);
        this.errorMessage = 'Failed to load designs';
      }
    );
  }

  // Handle file selection for design image upload
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Reset the form after submission
  resetForm(): void {
    this.newDesign = { logo: '', color: '', font: '', text: '' };
    this.selectedFile = null;
  }

  // Delete a design
  deleteDesign(id: number): void {
    this.designService.deleteDesign(id).subscribe(
      () => {
        this.designs = this.designs.filter((design: Design) => design.id !== id); // Remove the deleted design from the list
      },
      (error: any) => {
        this.errorMessage = 'Failed to delete design';
        console.error(error);
      }
    );
  }
}
