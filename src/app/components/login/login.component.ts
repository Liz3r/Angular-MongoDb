import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Observer, Subscription, catchError, concat, concatMap, merge, of, switchMap, take, takeWhile } from 'rxjs';
import { ValidationErrorHandler } from 'src/app/helpers/handle.validation.errors';
import { AuthService } from 'src/app/services/auth.service';
import { AppState } from 'src/app/state/app-state';
import { auth, login } from 'src/app/state/auth.actions';
import { selectError, selectIsLoading, selectIsLogged } from 'src/app/state/auth.selector';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  errorMsg$!: Observable<string | null>;
  loggedIn$!: Subscription;
  isLoading$!: Observable<boolean>;



  constructor(
    private router: Router,
    private store: Store<AppState>,
    private handler: ValidationErrorHandler
  ){}


  ngOnInit(): void {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.loggedIn$ = 
    this.store.select(selectIsLogged)
    .subscribe((isLogged) => {
      if(isLogged){ 
        this.loggedIn$.unsubscribe(); 
        this.router.navigate(['/home']);
      }});

    this.errorMsg$ = merge(this.handler.getErrorHandler(),this.store.select(selectError));

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(25)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25)])
    })
    
  }


  login():void{
    const value = this.loginForm.getRawValue();

    if(!this.handler.checkErrors(this.loginForm)){
      this.store.dispatch(login(value));
    }
    //this.store.dispatch(login(value));
    //this.router.navigate(['/home']);
  }

}
