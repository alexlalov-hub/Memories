import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
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

    register() {
        console.log('register created')
    }
}
