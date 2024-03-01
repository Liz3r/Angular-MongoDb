import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { matchPasswords } from 'src/app/helpers/custom.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{


  registerForm!: FormGroup;
  errorMsg!: string;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ){

  }


  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required ,Validators.minLength(2), Validators.maxLength(12), Validators.pattern("[A-Za-z ]*")]),
      surname: new FormControl('', [Validators.required ,Validators.minLength(2), Validators.maxLength(12), Validators.pattern("[A-Za-z ]*")]),
      email: new FormControl('', [Validators.required ,Validators.email]),
      password: new FormControl('', [Validators.required ,Validators.minLength(8), Validators.maxLength(25)]),
      repeatPassword: new FormControl('', [Validators.required ,Validators.minLength(8), Validators.maxLength(25)]),
      address: new FormControl('', [Validators.required ,Validators.minLength(2), Validators.maxLength(12), Validators.pattern("[A-Za-z ]*")])      
    }, {validators: matchPasswords});

  }



  submit(){
    console.log(this.registerForm.errors);
  }


  // submit(): void{
  //   const values = this.form.getRawValue();
  //   if(values.name.length === 0 ||
  //     values.surname.length === 0 ||
  //     values.email.length === 0 ||
  //     values.password.length === 0 ||
  //     values.rPassword.length === 0 ||
  //     values.address.length === 0)
  //     {
  //       this.errorMsg = 'fill empty fields';
  //       return;
  //     }
  //   if(values.password !== values.rPassword){
  //     this.errorMsg = 'passwords do not match';
  //     return;
  //   }
  //   if(!values.email.match(this.emailRegex)){
  //     this.errorMsg = 'invalid email';
  //     return;
  //   }
  //   this.errorMsg = '';
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
