import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { AddTrainComponent } from './components/add-train/add-train.component';
import { TrainsComponent } from './components/trains/trains.component';

const routes: Routes = [
  {path:'',component:HomeComponent,
    children: [
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'bookings',
        component:BookingsComponent
      },
      {
        path:'trains',
        component:TrainsComponent
      },
      {
        path: 'add-train',
        component:AddTrainComponent
      },
      {
        path:'users',
        component:UsersComponent
      },
      {
        path: '', redirectTo: '/admin/dashboard', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
