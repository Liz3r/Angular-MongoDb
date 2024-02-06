import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faImage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit{
  
  imageIcon = faImage;
  form!: FormGroup;
  errMsg: String = '';

  file!: File | null;
  pictureData: String | null = null;

  
  constructor(
    private http: HttpClient
  ){}
  
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl<String>(''),
      currency: new FormControl<String>('din'),
      state: new FormControl<String>('new'),
      description: new FormControl<String>(''),
      location: new FormControl<String>(''),
      number: new FormControl<String>(''),
      picture: new FormControl(null)
    });
  }

  onImageSelected(event: Event):void {

    if (!event.target)
      return;

    const target = event.target as HTMLInputElement
    if (!target.files) {
      this.errMsg = "No file selected";
      return;
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
      this.pictureData = null;
      this.errMsg = this.file.size < 400*1024? 'File too large (max 400KB)' : 'Invalid format';
      this.file = null;
    }
    console.log(this.file?.size);
  }


  submit(){
    
  }
  
}
