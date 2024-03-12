import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";


export const matchPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const repeatPassword = control.get('repeatPassword');
        if (password && repeatPassword) {
            return password.value === repeatPassword.value? null : { PasswordsNotMatching: true };
        }

        throw new Error("Form controls 'password' and 'repeatPassword' are not present in form you passed.");
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

// export function fileSizeValidator(files: FileList) {
//     return function(control: FormControl) {
//       const file = control.value;
//       if (file) {
//         var path = file.replace(/^.*[\\\/]/, "");
//         const fileSize = files.item(0).size;
//         const fileSizeInKB = Math.round(fileSize / 1024);
//         if (fileSizeInKB >= 19) {
//           return {
//             fileSizeValidator: true
//           };
//         } else {
//           return null;
//         }
//       }
//       return null;
//     };
//   }

export function isNumber(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const reg = /^[0-9]*$/;
        if(control.value && typeof(control.value) === 'string'){

            return reg.test(control.value)? null : {notNumber: true};
        }
        return null;
    }
}