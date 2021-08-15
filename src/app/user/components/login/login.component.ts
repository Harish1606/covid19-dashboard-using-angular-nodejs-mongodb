import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { User } from '../../modules/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router:Router,private _service:RegistrationService) { }

  user=new User();
  message='';

  loading=false;
  ngOnInit(): void {
  }

  loginUser(){
    this.loading=true;
    this._service.login(this.user).subscribe(
      data=>{
        localStorage.setItem('user',data.token);
        this.loading=false;
        this.router.navigate(['/user/home']);
      },
      error=>{
        this.loading=false;
        this.message="Invalid emailId and password";
      }
    )
  }

}
