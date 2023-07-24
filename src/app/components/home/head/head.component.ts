import { Component } from '@angular/core';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent {

  phoneIcon = faPhone;

  
}
