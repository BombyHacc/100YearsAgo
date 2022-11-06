import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

    finalEventList: String[] = [];
    
  getEvents(){
    var bornlist:String[]; 
    bornlist = [];
    var diedlist:String[]; 
    diedlist = [];
    var events:String[];
    events = []
    
    
    this.service.getEvents().subscribe((response)=>{
     
     let obj = JSON.parse(JSON.stringify(response))
    let data = obj.parse.wikitext["*"];
    let cleanText = data.replace(/<\/?[^>].+(>|$)/g, "").replace(/(\|.+?])|[\[\]]/g,"");
    //.replace(/(,.*?])|[\[\]]/g,"")
    events = cleanText.split("*");
    console.log(events)
   
    for (var el in events){
      if (events[el].includes("Died:"))
      {
        for (let i = parseInt(el); i < events.length; i++){
          console.log("here")
          diedlist.push(events[i])
        }
        
      }
      if (events[el].includes("Born:"))
      {
        for (let i = parseInt(el)+1; i < events.length; i++){
          if (events[i].includes("Died:"))
          {
            break;
          }
          bornlist.push(events[i])
        }
        
        
      }
      
    }

    for(var el in events){
      if (events[el].includes("Born:")){
        this.finalEventList=events.slice( 0 , parseInt(el) );
        break;
      }
      if (events[el].includes("Died:")){
        this.finalEventList=events.slice( 0 , parseInt(el) );
        break;
      }
    }
  
    console.log(this.finalEventList.shift());
    console.log(bornlist);
    console.log(diedlist);
    },(error)=>{

    });
  }

  

  constructor(private service:UserService) { }

  ngOnInit(): void {
    this.getEvents()
  }

}
