import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    credentials = {
        email: '',
        password: ''
    }
    showAlert = false
    alertMessage = 'Please wait while we try to log you in!'
    alertColor = 'orange'
    isSubmitting = false

    constructor(private auth: AuthService) {
    }

    ngOnInit(): void {
    }

    async login(){
        this.showAlert = true
        this.alertMessage = 'Please wait while we try to log you in!'
        this.alertColor = 'orange'
        this.isSubmitting = true

        try {
            await this.auth.logUser(this.credentials.email, this.credentials.password)
        }catch (e){
            this.isSubmitting = false
            this.alertMessage = 'Something went wrong!'
            this.alertColor = 'red'

            return
        }

        this.alertMessage = 'Success!'
        this.alertColor = 'green'
    }

}
