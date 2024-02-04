import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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



  file: File | undefined;

  pic: String = "../../assets/profile_placeholder.png";
  email!: String;
  name!: String;
  surname!: String;
  address!: String;

  profileChangesErr: String = '';

  constructor(
    private http: HttpClient
  ){

  }
  ngOnInit(): void {
    
    this.http.get<User>(`${environment.apiUrl}/getUserProfile`,{ withCredentials: true})
    .subscribe(res=>{
      this.email = res.email;
      this.name = res.name;
      this.surname = res.surname;
      this.address = res.address;
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

    if(this.file.size < 400*1024){ 
      //velicina slike mora biti ispod 400 KB

      this.pic = URL.createObjectURL(this.file);
    }else{

      this.pic = "../../assets/profile_placeholder.png";
      this.profileChangesErr = 'File too large (max 400KB)';
    }
    console.log(this.file.size);
  }


  addressChange(newAddress: String){
    this.address = newAddress;
  }
  nameChange(newName: String){
    this.name = newName;
  }
  surnameChange(newSurname: String){
    this.surname = newSurname;
  }
  emailChange(newEmail: String){
    this.email = newEmail;
  }

  onSubmit(){
    console.log(this.address);
  }
}
