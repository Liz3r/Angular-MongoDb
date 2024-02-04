import { HttpClient } from '@angular/common/http';
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


  form!: FormGroup;

  file: File | null | undefined;
  pictureData: String = "../../assets/profile_placeholder.png";

  profileChangesErr: String = '';

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

    this.http.get<User>(`${environment.apiUrl}/getUserProfile`,{ withCredentials: true})
    .subscribe(res=>{
      this.form.patchValue({email: res.email});
      this.form.patchValue({name: res.name});
      this.form.patchValue({surname: res.surname});
      this.form.patchValue({address: res.address});
    })
  }



  onImageSelected(event: Event):void {

    if (!event.target)
      return

    const target = event.target as HTMLInputElement
    if (!target.files) {
    // toastError('No image selected')
      return
    }
    this.file = target.files[0];

    const types = ["image/png", "image/jpg", "image/jpeg"];

    if(this.file && types.includes(this.file.type) && this.file.size < 400*1024){ 
      //velicina slike mora biti ispod 400 KB
      this.form.patchValue({picture: this.file});
      this.pictureData = URL.createObjectURL(this.file);
    }else{

      this.form.patchValue({picture: null});
      this.pictureData = "../../assets/profile_placeholder.png";
      this.profileChangesErr = this.file.size < 400*1024? 'File too large (max 400KB)' : 'Invalid format';
      this.file = null;
    }
    console.log(this.file?.size);
  }

  onSubmit(){
    console.log(this.form);
  }
}
