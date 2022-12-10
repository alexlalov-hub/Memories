import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import IUser from "../../models/user.model";
import {RegisterValidators} from "../validators/register-validators";
import {EmailChecker} from "../validators/email-checker";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    showAlert = false
    alertMessage = 'Please wait while your account is being created'
    alertColor = 'orange'
    inSubmission = false

    constructor(private auth: AuthService, private emailChecker: EmailChecker) {
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
        ], [this.emailChecker.validate]),
        age: new FormControl<number | null>(null, [
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
    }, [RegisterValidators.matchPass])

    async register() {
        this.showAlert = true
        this.alertMessage = 'Please wait while your account is being created!'
        this.alertColor = 'orange'
        this.inSubmission = true

        try {
            await this.auth.createUser(this.registerForm.value as IUser)
        }catch (e){
            this.alertMessage = 'Something went wrong!'
            this.alertColor = 'red'
            this.inSubmission = false
            return
        }

        this.inSubmission = false
        this.alertMessage = 'Success!'
        this.alertColor = 'green'
    }
}
