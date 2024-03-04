import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, of } from 'rxjs';
import { ValidationErrorHandler } from 'src/app/helpers/handle.validation.errors';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/state/app-state';
import { auth, login } from 'src/app/state/auth.actions';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  errorMsg$!: Observable<string | null>;
  emailRegex = /[a-zA-Z1-9]+@[a-z]+\.[a-z]+/;



  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>,
    private handler: ValidationErrorHandler
  )
  {

  }


  ngOnInit(): void {
    
    this.errorMsg$ = this.handler.getErrorHandler();

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(25)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25)])
    })
    
  }

  login():void{
    const value = this.loginForm.getRawValue();
    // if(value.email.length === 0 || value.password.length === 0){
    //   this.errorMsg = 'fill empty fields';
    //   return;
    // }
    // if(!value.email.match(this.emailRegex)){
    //   this.errorMsg = 'invalid email';
    //   return;
    // }

    // let errors = getErrorMessage(this.loginForm);
    // if(errors){
    //   this.errorMsg = errors;
    //   return;
    // }
    this.handler.checkErrors(this.loginForm);
    // this.http.post(`${environment.apiUrl}/login`,value, { withCredentials: true })
    // .pipe(catchError((err,c) => {
    //   if(err.status == 404){
    //     this.errorMsg = 'Invalid username';
    //   }
    //   if(err.status == 401){
    //     this.errorMsg = 'Invalid password';
    //   }
    //   return of(false);
    // }))
    // .subscribe((res)=>{
    //   if(res)
    //     this.router.navigate(['/home'])
    // });

    //this.store.dispatch(login(value));
    //this.router.navigate(['/home']);
  }

}
