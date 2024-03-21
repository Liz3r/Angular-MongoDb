import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

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

  @Output() hideDialog = new EventEmitter();

  
  constructor(
    private http: HttpClient,
    private router: Router
  ){}
  
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl<String>(''),
      currency: new FormControl<String>('din'),
      state: new FormControl<String>('new'),
      price: new FormControl<String>(''),
      description: new FormControl<String>(''),
      itemPicture: new FormControl(null)
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

    if(this.file && types.includes(this.file.type) && this.file.size < 1024*1024){ 
      //velicina slike mora biti ispod 400 KB
      this.form.patchValue({itemPicture: this.file});

      const reader = new FileReader();
      
      reader.onload = () =>{
        this.pictureData = reader.result as String;
      }
      console.log(this.file.name);
      reader.readAsDataURL(this.file);
    }else{

      this.form.patchValue({itemPicture: null});
      this.pictureData = null;
      this.errMsg = this.file.size < 1024*1024? 'File too large (max 1MB)' : 'Invalid format';
      this.file = null;
    }
    console.log(this.file?.size);
  }

  back(){
    this.hideDialog.emit();
  }

  submit(){
    const data = new FormData();

    if(this.form.value.title.length > 40){
      this.errMsg = 'Title too long';
      return;
    }
    if(this.form.value.description.length > 1000){
      this.errMsg = 'Description too long';
      return;
    }
    

    data.append('title', this.form.value.title);
    data.append('currency', this.form.value.currency);
    data.append('state', this.form.value.state);
    data.append('description', this.form.value.description);
    data.append('price', this.form.value.price);
    data.append('itemPicture', this.form.value.itemPicture, this.form.value.itemPicture.name);

    this.http.put(`${environment.apiUrl}/postItem`, data, { withCredentials: true})
    .subscribe(res=>{
      console.log(res);
      this.router.navigate(['/my-products']);
    });
  }
  
}
