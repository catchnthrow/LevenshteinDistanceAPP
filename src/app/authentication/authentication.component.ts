import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserDataService } from '../services/user-data.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  public uid : string;
  public pwd : string;
  public failedLogin : boolean;

  constructor(
    private router : Router,
    private http: HttpClient,
    private userDataService : UserDataService
  ) {
  }

  ngHandleLoggedInUser(userData) {
    if(userData && userData.token && userData.token.length > 0){
      this.router.navigate(['distance-finder']);
      this.failedLogin = false;
    } else {
      this.router.navigate(['auth']);
    }
  }

  ngOnInit() {
    var usr = this.userDataService.getUserData();
    if(usr != null && usr != undefined) {
      this.router.navigate(["auth"]);
    }
  }

  login() {
    
    if(this.uid == undefined || this.pwd == undefined || this.uid.length < 4 || this.pwd.length < 4){
      this.failedLogin = true;
      return;
    }
    
    var u = this.uid;
    var p = this.pwd;
    this.failedLogin = false;
    this.http.post(environment.apiUrls.base + environment.apiUrls.auth, {Email:this.uid,Password:this.pwd}, {responseType:'json'})
    .subscribe(
      (response : any) => {
        console.log(response);
        if(response.message == "Success")
        {
          this.userDataService.saveUserData(response);
          this.ngHandleLoggedInUser(response);
        } else {
          this.failedLogin = true;
        }
      },
      (error: any) => {
        console.log(error);
        this.failedLogin = true;
      }
    );    
  }
}
