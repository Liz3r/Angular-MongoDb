import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  form!: FormGroup;
  errorMsg!: string;
  emailRegex!: RegExp;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  )
  {

  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: ''
    })
    this.errorMsg = '';
    this.emailRegex = /[a-zA-Z]+@[a-z]+\.[a-z]+/;
  }

  login(): void{
    const value = this.form.getRawValue();
    if(value.email.length === 0 || value.password.length === 0){
      this.errorMsg = 'fill empty fields';
      return;
    }
    if(!value.email.match(this.emailRegex)){
      this.errorMsg = 'invalid email';
      return;
    }
    this.http.post('http://localhost:5123/login',value, { withCredentials: true })
    .subscribe((res)=>{
      this.router.navigate(['/home'])
    });


  }

}
