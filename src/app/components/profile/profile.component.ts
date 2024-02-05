import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import '@fortawesome/fontawesome-svg-core';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
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
  changePasswordErr: String = '';

  constructor(
    private http: HttpClient
  ){

  }
  ngOnInit(): void {
    
    this.form = new FormGroup({
      email: new FormControl<String>(''),
      name: new FormControl<String>(''),
      surname: new FormControl<String>(''),
      address: new FormControl<String>(''),
      picture: new FormControl(null)
  });

  this.passwordForm = new FormGroup({
      password: new FormControl<String>(''),
      newPassword: new FormControl<String>(''),
      newPasswordRepeat: new FormControl<String>('')
  });

    this.http.get<User>(`${environment.apiUrl}/getUserProfile`,{ withCredentials: true})
    .subscribe(res=>{
      this.form.patchValue({email: res.email});
      this.form.patchValue({name: res.name});
      this.form.patchValue({surname: res.surname});
      this.form.patchValue({address: res.address});
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
    console.log(this.file?.size);
  }

  onSubmit(){

    const data = new FormData();

    data.append('name', this.form.value.name);
    data.append('surname', this.form.value.surname);
    data.append('email', this.form.value.email);
    data.append('address', this.form.value.address);
    data.append('picture', this.form.value.picture, this.form.value.picture.name);

    this.http.post(`${environment.apiUrl}/updateUserProfile`, data, { withCredentials: true})
    .subscribe(res=>{
      console.log(res);
    });
  }


  changePassword(){
    if(this.passwordForm.value.newPassword !== this.passwordForm.value.newPasswordRepeat){
      this.changePasswordErr = 'passwords do not match';
      return;
    }
    console.log(this.passwordForm.value.password);
    this.http.post(`${environment.apiUrl}/changePassword`,{password: this.passwordForm.value.password, newPassword: this.passwordForm.value.newPassword}, {withCredentials: true})
    .subscribe(res => {
      console.log(res);
    })
  }
}
