import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  day!:Number;
  month!:String;
  year!:Number;
  CurrntMonth: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 
  getEvents(){
    let date:Date= new Date();
    this.day=date.getDate();
    this.month=this.CurrntMonth[date.getMonth()];
    this.year=date.getFullYear()-100;
    console.log(this.day);
    console.log(this.month);
    console.log(this.year);
    let url = "https://en.wikipedia.org/w/api.php?action=parse&format=json&origin=*&page="+this.month+"%20"+this.year+"&prop=wikitext&section="+this.day+"&disabletoc=1"
    return this.http.get(url);
  }
  constructor(private http:HttpClient) { }

  getFacts(){
    return this.http.get('assets/trivia/'+this.month+'.txt', {responseType: 'text'})    
  }
}
