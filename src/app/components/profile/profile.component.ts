import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import '@fortawesome/fontawesome-svg-core';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { atozString, changePasswordCheck, isNumber } from 'src/app/helpers/custom.validators';
import { ValidationErrorHandler } from 'src/app/helpers/handle.validation.errors';
import { User } from 'src/app/models/user';
import { ProfileService } from 'src/app/services/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  addImageIcon = faFolderOpen;

  defaultPicture = "../../assets/profile_placeholder.png";

  form!: FormGroup;
  passwordForm!: FormGroup;

  file: File | null | undefined;
  pictureData: String = this.defaultPicture;

  profileChangesErr: String = '';
  changePasswordErr!: Observable<any>;


  changeSuccessMsg: String = '';

  constructor(
    private http: HttpClient,
    private profileService: ProfileService,
    private handler: ValidationErrorHandler
  ){

  }
  ngOnInit(): void {
    
    this.changePasswordErr = this.handler.getErrorHandler();

    this.form = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email, Validators.minLength(8), Validators.maxLength(25)]),
      name: new FormControl('',[Validators.required ,Validators.minLength(2), Validators.maxLength(12), atozString()]),
      surname: new FormControl('',[Validators.required ,Validators.minLength(2), Validators.maxLength(12), atozString()]),
      address: new FormControl('', [Validators.required ,Validators.minLength(2), Validators.maxLength(30)]),
      city: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30), atozString()]),
      phoneNumber: new FormControl('', [Validators.minLength(6), Validators.maxLength(30), isNumber()]),
      picture: new FormControl(null)
  });

  this.passwordForm = new FormGroup({
      password: new FormControl<String>('',[Validators.required, Validators.minLength(8), Validators.maxLength(25)]),
      newPassword: new FormControl<String>('',[Validators.required, Validators.minLength(8), Validators.maxLength(25)]),
      newPasswordRepeat: new FormControl<String>('',[Validators.required, Validators.minLength(8), Validators.maxLength(25)])
  }, { validators: changePasswordCheck});

    this.profileService.getProfileDetails()
    .subscribe(res=>{
      this.form.patchValue({email: res.email});
      this.form.patchValue({name: res.name});
      this.form.patchValue({surname: res.surname});
      this.form.patchValue({address: res.address});
      this.form.patchValue({city: res.city});
      this.form.patchValue({phoneNumber: res.phoneNumber});
      if(res.picture){
        this.pictureData = res.picture;
      }else{
        this.pictureData = this.defaultPicture;
      }
    })
  }

  onImageSelected(event: Event):void {

    if (!event.target)
      return

    const target = event.target as HTMLInputElement
    if (!target.files) {
      this.profileChangesErr = 'Invalid picture input';
      return
    }
    this.file = target.files[0];

    const types = ["image/png", "image/jpg", "image/jpeg"];

    if(this.file && types.includes(this.file.type) && this.file.size < 400*1024){ 
      //velicina slike mora biti ispod 400 KB
      this.form.patchValue({picture: this.file});

      const reader = new FileReader();
      
      reader.onload = () =>{
        this.pictureData = reader.result as String;
      }

      reader.readAsDataURL(this.file);
    }else{
      this.form.patchValue({picture: null});
      this.pictureData = this.defaultPicture;
      this.profileChangesErr = this.file.size < 400*1024? 'File too large (max 400KB)' : 'Invalid format';
      this.file = null;
    }

  }

  onSubmit(){

    const data = new FormData();

    data.append('name', this.form.value.name);
    data.append('surname', this.form.value.surname);
    data.append('email', this.form.value.email);
    data.append('address', this.form.value.address);
    data.append('city', this.form.value.city);
    data.append('phoneNumber', this.form.value.phoneNumber);
    if(this.form.value.picture)
      data.append('picture', this.form.value.picture, this.form.value.picture.name);

    this.profileService.updateProfile(data)
    .subscribe(res=>{
      console.log(res);
    });
  }


  changePassword(){
    if(!this.handler.checkErrors(this.passwordForm)){
      this.profileService.changePassword(this.passwordForm.value.password, this.passwordForm.value.newPassword)
      .subscribe(res => {
        console.log(res);
      })
    }
  }
}
