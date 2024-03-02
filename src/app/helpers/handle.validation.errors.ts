import { FormGroup } from "@angular/forms";

export function getErrorMessage(form: FormGroup): string | null{
    
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
      }
    })

    if(form.hasError('PasswordsNotMatching'))
        errorMessage = 'Passwords do not match';

    return errorMessage;
}