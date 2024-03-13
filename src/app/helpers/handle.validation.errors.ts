import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { BehaviorSubject, Observable, Subject, take } from "rxjs";

@Injectable({providedIn: 'root'})
export class ValidationErrorHandler{

  private validationErrorObs: Subject<string | null> = new Subject<string | null>();

  constructor(){}

  getErrorHandler(): Observable<string | null>{
    return this.validationErrorObs;
  }

  checkErrors(form: FormGroup): boolean{
    
    const keys = Object.keys(form.controls);

    let errorMessage: string | null = null;

    keys.forEach(keyName => {
      if(errorMessage)
        return;

      let key = form.get(keyName);
      if(key && key.errors){
        if(key.hasError('required'))
          errorMessage = keyName + ' field is required';
        if(key.hasError('minlength'))
          errorMessage = keyName + ' too short';
        if(key.hasError('maxlength'))
          errorMessage = keyName + ' too long';
        if(key.hasError('minlength'))
          errorMessage = keyName + ' too short';
        if(key.hasError('email'))
          errorMessage = 'invalid email';
        if(key.hasError('notAtoZString'))
          errorMessage = keyName + ' field must be a-z string';
        if(key.hasError('notNumber'))
          errorMessage = keyName + ' field must be a number';
      }
    })

    if(form.hasError('PasswordsNotMatching'))
        errorMessage = 'Passwords do not match';

    if(errorMessage)
      this.validationErrorObs.next(errorMessage);

    return !!errorMessage;
}
}

