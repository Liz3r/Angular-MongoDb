import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable({ providedIn: 'root'})
export default class check{

    constructor(
        private router: Router
    ){}

    cookie(){
        if(document.cookie === ''){
            this.router.navigate(['/login']);
        }
    }

}
