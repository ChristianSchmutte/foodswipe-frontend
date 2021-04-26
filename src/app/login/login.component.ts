import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) { 
    this.loginForm = this.constructForm();
  }

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe((form) => {
      console.log(form);
    });
  }

  private constructForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  handleLogin(){
    console.log('Hello:', this.loginForm.value);
  }

}
