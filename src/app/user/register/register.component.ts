import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    showAlert = false
    alertMessage = 'Please wait while your account is being created'
    alertColor = 'blue'

    constructor(private auth: AngularFireAuth) {
    }

    registerForm = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(16),
        ]),
        email: new FormControl('', [
            Validators.required,
            Validators.email
        ]),
        age: new FormControl('', [
            Validators.required,
            Validators.min(18),
            Validators.max(120)
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        ]),
        confirmPassword: new FormControl('', [
            Validators.required,
            Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        ]),
        phoneNumber: new FormControl('', [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10)
        ])
    })

    async register() {
        this.showAlert = true
        this.alertMessage = 'Please wait while your account is being created'
        this.alertColor = 'blue'

        const {email, password} = this.registerForm.value;

        try {
            await this.auth.createUserWithEmailAndPassword(email as string, password as string)
        }catch (e){
            this.alertMessage = 'Something went wrong. Try again later.'
            this.alertColor = 'red'
            return
        }

        this.alertMessage = 'Success!'
        this.alertColor = 'green'
    }
}
