import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const matchPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const repeatPassword = control.get('repeatPassword');
        if (password && repeatPassword) {
            return password.value === repeatPassword.value? null : { PasswordsNotMatching: true };
        }

        throw new Error("Form controls 'password' and 'repeatPassword' are not present in form you passed.");
}
