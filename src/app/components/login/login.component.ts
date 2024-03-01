import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  form!: FormGroup;
  errorMsg = '';
  emailRegex = /[a-zA-Z1-9]+@[a-z]+\.[a-z]+/;

  constructor(
    private http: HttpClient,
    private router: Router
  )
  {

  }


  ngOnInit(): void {

    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    }, [Validators.required])
    
  }

  login():void{
    const value = this.form.getRawValue();
    if(value.email.length === 0 || value.password.length === 0){
      this.errorMsg = 'fill empty fields';
      return;
    }
    if(!value.email.match(this.emailRegex)){
      this.errorMsg = 'invalid email';
      return;
    }
    this.http.post(`${environment.apiUrl}/login`,value, { withCredentials: true })
    .pipe(catchError((err,c) => {
      if(err.status == 404){
        this.errorMsg = 'Invalid username';
      }
      if(err.status == 401){
        this.errorMsg = 'Invalid password';
      }
      return of(false);
    }))
    .subscribe((res)=>{
      if(res)
        this.router.navigate(['/home'])
    });


  }

}
