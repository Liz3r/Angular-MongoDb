import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const matchPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const repeatPassword = control.get('repeatPassword');
        if (password && repeatPassword) {
            return password.value === repeatPassword.value? null : { PasswordsNotMatching: true };
        }

        return null;
}

export const changePasswordCheck: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const oldPassword = control.get('password');
    const password = control.get('newPassword');
    const repeatPassword = control.get('newPasswordRepeat');
    if (password && repeatPassword && oldPassword) {
        if(password.value !== repeatPassword.value){
            return { PasswordsNotMatching: true };
        }else if( oldPassword === password){
            return { oldPassword: true };
        }
        return null
    }

    return null;
}

export function atozString(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const reg = /^[A-Za-z ]*$/;
        if(control.value && typeof(control.value) === 'string'){

            return reg.test(control.value)? null : {notAtoZString: true};
        }
        return null;
    }
}

export function isNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const reg = /^[0-9]*$/;
        if(control.value && typeof(control.value) === 'string'){

            return reg.test(control.value)? null : {notNumber: true};
        }
        return null;
    }
}