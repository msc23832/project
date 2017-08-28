import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sass',
  templateUrl: './sass.component.html',
  styleUrls: ['./sass.component.css']
})
export class SassComponent implements OnInit {

  private log = 'Log Out';
  show: boolean = true;
  isActive: boolean = true;
  list = [{
    Message: "MSG : Have a Nice Day" ,
    Name: "NAME : Sivach Charoensilawat",
    Birth: "BIRTH : 17/09/1992"
  },{
    Message: "MSG : Hello World" ,
    Name: "NAME : Line Brown",
    Birth: "BIRTH : 01/01/1992"
  }];
  conditionExpression = "A";
  case1Exp = "B"; 

  constructor(private router: Router) { }

  onLogOut() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
    this.log = 'Log In';
  }

  ngOnInit() {
    // $(".button-collapse").sideNav();
  }

}
