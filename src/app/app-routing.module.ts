import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationComponent } from './authentication/authentication.component'; 
import { DistanceFinderComponent } from './distance-finder/distance-finder.component'; 


const routes: Routes = [
  { path: '', component: AuthenticationComponent },
  { path: 'auth', component: AuthenticationComponent },              
  { path: 'distance-finder', component: DistanceFinderComponent }           
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }