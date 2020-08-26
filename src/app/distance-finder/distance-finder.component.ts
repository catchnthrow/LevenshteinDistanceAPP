import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery' ;
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-distance-finder',
  templateUrl: './distance-finder.component.html',
  styleUrls: ['./distance-finder.component.scss']
})
export class DistanceFinderComponent implements OnInit {

  public input1 : string;
  public input2 : string;
  public input1Err : boolean;
  public input2Err : boolean;
  public errMessage : string;
  public headerRow : string[];
  public distanceArray : string[][];
  public drawTable : boolean;
  public answer: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.input1Err = false;
    this.input2Err = false;
    this.drawTable = false;
  }

  findDistance(){
    this.input1Err = false;
    this.input2Err = false;
    this.errMessage = '';   
    this.drawTable = false;

    if(this.input1 && this.input1.length > 0 && this.input2 && this.input2.length > 0 ){
      this.http.post(environment.apiUrls.base + environment.apiUrls.distanceFinder, {Str1:this.input1,Str2:this.input2}, {responseType:'json'})
      .subscribe(
        (response : any) => {
          console.log("response : ", response);
          if(response.message == "Success")
          {
            var data = JSON.parse(response.data);
            
            //Create the table object
            var input1Arr = [''].concat(this.input1.split(''));
            this.headerRow = ['',''].concat(this.input2.split(''));
            this.distanceArray = new Array(input1Arr.length);
            for(var i = 0; i < data.length; i++){
              this.distanceArray[i] = [input1Arr[i]].concat(data[i]);
            }

            this.drawTable = true;
            this.answer = this.distanceArray[this.input1.length][this.input2.length + 1];


            //Decorate the table
            setTimeout(function(){
              $('table tr:gt(0)').find('td:first').css('background','grey').css('font-weight', 'bold');
              $('thead tr').css('background','grey').css('font-weight', 'bold');
              $('table td:last').css('background', '#8ed5f8').css('font-weight', 'bold');
              $('.asnwer').css('font-size', '25px').css('font-weight', 'bold').css('color', 'blue');
            }, 100);
            
          } 
          else {
            this.errMessage = "Something went wrong.";
            console.log("Something went wrong.")
          }
        },
        (error: any) => {
          console.log("error : ", error.status);
          if(error.status == 401){
            this.errMessage = "Not Authorized. Login again.";
          }
          else {
            this.errMessage = "Something went wrong.";
          }
        }
      );
    } else {
      console.log(this.input2);
      this.input1Err = !this.input1 || this.input1.length == 0;
      this.input2Err = !this.input1 || this.input1.length == 0;
    }
  } 
}
