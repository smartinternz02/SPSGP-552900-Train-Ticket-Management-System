import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { BookingsComponent } from './components/bookings/bookings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { UsersComponent } from './components/users/users.component';
import { AddTrainComponent } from './components/add-train/add-train.component';
import { TrainsComponent } from './components/trains/trains.component';


@NgModule({
  declarations: [
    DashboardComponent,
    BookingsComponent,
    HomeComponent,
    UsersComponent,
    AddTrainComponent,
    TrainsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
