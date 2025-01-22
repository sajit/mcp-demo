import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css'
})
export class PersonComponent {
    formData = {
      name: '',
      ssn: 0,
      dob: '',
    };

    submittedData: { name: string; ssn: number; dob: string }[] = [];

    onSubmit(): void {
      // Add the form data to the submittedData array
      this.submittedData.push({ ...this.formData });

      // Clear the form fields
      this.formData = {
        name: '',
        ssn: 0,
        dob: '',
      };
    }

}



