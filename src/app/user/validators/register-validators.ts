import {ValidationErrors, AbstractControl} from "@angular/forms";

export class RegisterValidators {
    static matchPass(group: AbstractControl): ValidationErrors | null{
        const password = group.get('password')
        const confirmPass = group.get('confirmPassword')

        if(!password || !confirmPass){
            return { controlNotFound: false}
        }

        const err = password.value === confirmPass.value ? null : { passNotMatching: true}

        confirmPass.setErrors(err);

        return err;
    }
}
