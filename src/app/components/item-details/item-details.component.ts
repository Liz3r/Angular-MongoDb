import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

interface recvType {
  title: String
  description: String,
  datePosted: Date,
  price: Number,
  currency: String,
  state: String,
  phoneNumber: Number,
  picture: String,

  dateMessage: String,

  userName: String,
  userSurname: String,
  userEmail: String,
  userCity: String,
  userAddress: String,
  userPhone: Number,
  following: Boolean
};

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit{

  id: any | undefined = '';

  name!: String;
  city!: String;
  address!: String;
  email!: String;
  phone!: Number;
  picture!: String;

  title!: String;
  price!: String;
  description!: String;
  datePosted!: String;
  dateMessage!: String;
  state!: String;

  following!: Boolean;

  constructor( 
    private router: Router,
    private http: HttpClient
  ){

    this.id = this.router.getCurrentNavigation()?.extras.state;
  }


  ngOnInit(): void {
    this.http.get<recvType>(`${environment.apiUrl}/getItemDetails/${this.id.itemId}`, {withCredentials: true}).subscribe(res=>{
      this.name = res.userName + " " + res.userSurname;
      this.city = res.userCity;
      this.address = res.userAddress;
      this.email = res.userEmail;
      this.phone = res.userPhone;
      this.title = res.title;
      this.price = '' + res.price + " " + res.currency;
      this.description = res.description;
      this.dateMessage = res.dateMessage;
      this.picture = res.picture;
      this.datePosted = (new Date(res.datePosted)).toLocaleDateString();
      this.following = res.following;
      this.state = res.state;
    });
  }

  follow(): void{
    this.http.put(`${environment.apiUrl}/follow`, {itemId: this.id.itemId}, {withCredentials: true})
    .pipe(catchError((err,obs) => {console.log(err); return obs;}))
    .subscribe(res=>{
      console.log(res);
      if(res){
        this.following = true;
      }
    });
  }

  back(): void{
    if(typeof(this.id.prev) === 'string')
      this.router.navigate([this.id.prev]);
  }

}
