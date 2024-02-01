import { Component, OnInit } from '@angular/core';
import '@fortawesome/fontawesome-svg-core';
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  addImageIcon = faFolderOpen;
  file: File | undefined;

  constructor(){

  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }


  onImageSelected(event: Event):void {

    if (!event.target)
      return

    const target = event.target as HTMLInputElement
    if (!target.files) {
    // toastError('No image selected')
      return
    }

    console.log(target.files);
  }
}
