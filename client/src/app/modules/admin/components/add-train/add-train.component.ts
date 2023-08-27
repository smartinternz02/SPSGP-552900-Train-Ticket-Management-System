import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-train',
  templateUrl: './add-train.component.html',
  styleUrls: ['./add-train.component.css']
})
export class AddTrainComponent {

  formData: any = {}; 

  constructor(private http:HttpClient, private route: Router){}

  onSubmit() {
    // Handle form submission logic
    console.log(this.formData); // Example: Log the form data
    this.http.post('http://localhost:5100/trains',this.formData).subscribe((res) => {
      console.log(res)
      alert('Train Added.');
      this.route.navigate(['/admin/trains'])
    })
  }
}
