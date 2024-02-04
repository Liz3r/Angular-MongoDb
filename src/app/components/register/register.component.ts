import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{


  form!: FormGroup;
  errorMsg!: string;
  emailRegex!: RegExp;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ){

  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: '',
      surname: '',
      email: '',
      password: '',
      rPassword: '',
      address: ''
    });
    this.errorMsg = '';
    this.emailRegex = /[a-zA-Z]+@[a-z]+\.[a-z]+/;
  }

  submit(): void{
    const values = this.form.getRawValue();
    if(values.name.length === 0 ||
      values.surname.length === 0 ||
      values.email.length === 0 ||
      values.password.length === 0 ||
      values.rPassword.length === 0 ||
      values.address.length === 0)
      {
        this.errorMsg = 'fill empty fields';
        return;
      }
    if(values.password !== values.rPassword){
      this.errorMsg = 'passwords do not match';
      return;
    }
    if(!values.email.match(this.emailRegex)){
      this.errorMsg = 'invalid email';
      return;
    }
    this.errorMsg = '';
    const {rPassword, ...user} = values;
    
    this.http.post<any>(`${environment.apiUrl}/register`,user)
    .subscribe((res)=>{
      if(res.taken === true){
        this.errorMsg = 'user with this email already exists';
        return;
      }
      this.router.navigate(['/login']);
    })
  }

}
