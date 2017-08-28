import { NgModule, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private Login;

  constructor(private router: Router) {
    this.Login = {
      Email: '',
      Password: ''
    };
  }

  login() {
    // if ($('.invalid').length > 0) {
    //   Materialize.toast('Invalid', 4000);
    // } else {
    //   //if (this.Login.Email === 'admin@admin.co.th' && this.Login.Password === 12345 ) {
    //     localStorage.setItem('token', 'login');
    //     console.log(this.Login);
    //     //Materialize.toast('Success', 4000);
    //     this.router.navigate(['support']);
    //   //}
    // }
    
    //  this.router.navigate(['/home']);
    //}
    //console.log(this.Email);
    //console.log(this.Password);
  }

  ngOnInit() {
  }

}
