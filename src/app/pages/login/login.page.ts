import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUser = {
    email: '22districalze@gmail.com',
    password: '123456'
};

  constructor() { }

  ngOnInit() {
  }

}
