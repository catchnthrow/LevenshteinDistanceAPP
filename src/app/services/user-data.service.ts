import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private router : Router) { }

  saveUserData(userData){
    if(userData && userData.token && userData.token.length > 0){
      localStorage.setItem('user-token', userData.token);
    }
  }

  getUserData(){
    var userToken = localStorage.getItem('user-token');
    if(userToken){      
      return  { token : userToken };
    } else {
      this.router.navigate["auth"];
    }
  }
  
  removeUserData(){
    var userToken = localStorage.getItem('user-token');
    if(userToken){      
      localStorage.removeItem('user-token');
    } else {
      this.router.navigate["auth"];
    }    
  }
}
