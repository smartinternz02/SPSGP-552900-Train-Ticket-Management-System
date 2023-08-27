import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent {
  @ViewChild('content', { static: false }) modalContent!: TemplateRef<any>;
  @ViewChild('payment', { static: false }) paymentModal!: TemplateRef<any>;

  selectedFrom: string;
  selectedTo: string;
  selectedDate: string;
  selectedTrain: string;
  availableSeats = 0
  passengers: { name: string, age: number}[] = [];
  currentModal: NgbModalRef | null = null;
  selectedMethod: string = ''
  returnDate: string = ''
  isLoading = false
  roundTrip: boolean = false;

  onRoundTripChange(event: any) {
    this.roundTrip = event.target.checked;
    console.log('Round trip value:', this.roundTrip);
  }  
  error: string = "";

  checkSelectedDate() {
    const today = new Date();
    const selected = new Date(this.selectedDate);
    if (selected < today) {
      this.error = 'Please select a future date.';
      this.selectedDate = '';
    } else {
      this.error = "";
    }
  }
  checkReturnDate() {
    const today = new Date(this.selectedDate);
    const selected = new Date(this.returnDate);
    if (selected <= today) {
      this.error = 'Please select a future date.';
      this.returnDate = '';
    } else {
      this.error = "";
    }
  }


  getRange(count: number): number[] {
    return Array(count).fill(0).map((_, index) => index);
  }

  isSame = false;
  totalPrice = 0;
  noOfPassengers = 0;
  trains: any[] = [];
  trainId: string = '';
  bookedSeats: any[] = [];
  coachClass: number = 0;
  trainName: string = '';
  trainNumber: string = '';
  email: string = '';
  mobile: string = '';
  StartStation: string = '';
  destinationStation: string = '';

  constructor(private http: HttpClient, private modalService: NgbModal, private route: Router) {
    this.selectedFrom = '';
    this.selectedTo = '';
    this.selectedDate = '';
    this.selectedTrain = '';
    this.noOfPassengers = 0;
    this.totalPrice = 0;
    this.coachClass = 0;
    const token = localStorage.getItem('adminJwtToken')
    if (token) {
      this.route.navigate(['/admin/dashboard'])
      const ownerToken = localStorage.getItem('ownerToken')
      if (ownerToken) {
        this.route.navigate(['/owner/flights'])
      }
    }

  }


  openModal(train: any, id: string) {
    const token = localStorage.getItem('jwtToken')
    if (token) {
      this.selectedTrain = train;
      this.trainId = id;
      this.trainNumber = train.trainNumber;
      this.trainName = train.trainName;
      this.StartStation = train.origin;
      this.destinationStation = train.destination;
      this.modalService.open(this.modalContent, { size: 'lg' });
      this.http.get<any[]>(`http://localhost:5100/trains/${id}`).subscribe((res: any) => {
        if (res) {
          const data = res.reservedSeats.filter((each: { date: string }) => {
            const eachDate = new Date(each.date);
            const selectedDate = new Date(this.selectedDate);
            return eachDate.getDate() === selectedDate.getDate();
          });
          this.bookedSeats = data.map((item: { seat: any, date: any }) => item.seat);
        } else {
          this.bookedSeats = [];
        }
      })
    } else {
      this.route.navigate(['/login'])
    }
  }


  search(): void {
    this.isLoading = true
    if (this.selectedFrom === this.selectedTo) {
      this.isSame = true
    } else {
      this.isSame = false
    }
    this.http.get<any[]>('http://localhost:5100/trains').subscribe((res) => {
      this.trains = res.filter(train => train.origin === this.selectedFrom && train.destination === this.selectedTo)
      this.isLoading = false
    })
  }


  initializePassengers(count: number) {
    for (let i = 0; i < count; i++) {
      this.passengers.push({ name: '', age: 0 });
    }
  }


  passengerCountChange(price: number){
    const seatCode:any = {'s2': 1, 'sleeper': 2, '3ac': 3, '2ac': 4, '1ac': 5};
    this.totalPrice = price * this.noOfPassengers * seatCode[this.coachClass];
    this.initializePassengers(this.noOfPassengers);
  }
  coachClassChange(price: number){
    const seatCode:any = {'s2': 1, 'sleeper': 2, '3ac': 3, '2ac': 4, '1ac': 5};
    this.totalPrice = price * this.noOfPassengers * seatCode[this.coachClass];
  } 

  async confirmBooking() {
    const userId = localStorage.getItem('userId')
    const bookingDetails = {
      user: userId,
      email: this.email,
      mobile: this.mobile,
      train: this.trainId,
      trainName: this.trainName,
      trainNumber: this.trainNumber,
      StartStation: this.StartStation,
      destinationStation: this.destinationStation,
      passengers: this.passengers,
      totalPrice: this.totalPrice,
      journeyDate: this.selectedDate,
      returnDate: this.returnDate,
      coachClass: this.coachClass
    };
    console.log(bookingDetails)
    const response = confirm("Are you sure you want to confirm the booking?")
    if (response) {
      await this.http.post('http://localhost:5100/book-ticket', bookingDetails).subscribe((res) => {
        console.log(res);
        this.route.navigateByUrl('/bookings');
      })
    }
  }


  isFormValid(): boolean {
    if (this.passengers.length === 0) {
      return false
    }
    return true;
  }
  isDestinationFormValid(): boolean {
    return !!this.selectedFrom && !!this.selectedTo && !!this.selectedDate;
  }

}
