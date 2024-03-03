import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { atozString, matchPasswords } from 'src/app/helpers/custom.validators';
import { getErrorMessage } from 'src/app/helpers/handle.validation.errors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app-state';
import { auth } from 'src/app/state/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;
  errorMsg!: string;

  constructor(
    private store: Store<AppState>
  ){}

  ngOnInit(): void {

    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required ,Validators.minLength(2), Validators.maxLength(12), atozString()]),
      surname: new FormControl('', [Validators.required ,Validators.minLength(2), Validators.maxLength(12), atozString()]),
      email: new FormControl('', [Validators.required ,Validators.email]),
      address: new FormControl('', [Validators.required ,Validators.minLength(2), Validators.maxLength(30)]),      
      password: new FormControl('', [Validators.required ,Validators.minLength(8), Validators.maxLength(25)]),
      repeatPassword: new FormControl('', [Validators.required ,Validators.minLength(8), Validators.maxLength(25)])
    }, {validators: matchPasswords});

  }

  submit(){
    let errors = getErrorMessage(this.registerForm);
    if(errors){
      this.errorMsg = errors;
      return;
    }

    this.errorMsg = '';
    //call service
    
  }


  //   const {rPassword, ...user} = values;
    
  //   this.http.post<any>(`${environment.apiUrl}/register`,user)
  //   .subscribe((res)=>{
  //     if(res.taken === true){
  //       this.errorMsg = 'user with this email already exists';
  //       return;
  //     }
  //     this.router.navigate(['/login']);
  //   })
  // }

}
