import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
import { LoginService } from '../shared/user/login.service';
import { Login } from '../shared/user/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ LoginService ]
})
export class LoginComponent implements OnInit {

  private Login: Login;

  constructor(private router: Router, private LoginService: LoginService) {
    // this.Login = {
    //   Email: '',
    //   Password: ''
    // };
    this.Login = new Login();
  }

  @ViewChild('loginForm') loginForm: NgForm;

  login() {
    console.log(this.Login);
      this.LoginService.doLogin(this.Login).subscribe((res) => {
        console.log(res);
        if (res.success) {
          localStorage.setItem('token', res.token);
          //this.router.navigate(['company']);
        } else {
          Materialize.toast(res.message, 1000);
        }
      });


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
