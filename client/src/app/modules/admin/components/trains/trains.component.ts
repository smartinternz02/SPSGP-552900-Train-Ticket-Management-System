import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-trains',
  templateUrl: './trains.component.html',
  styleUrls: ['./trains.component.css']
})
export class TrainsComponent {
  isLoading = false
  trains: any[] = []
  constructor(private http:HttpClient){
    this.isLoading = true
    this.http.get<any[]>('http://localhost:5100/trains').subscribe((res) => {
      this.trains = res
      this.isLoading = false
    })
  }
}
