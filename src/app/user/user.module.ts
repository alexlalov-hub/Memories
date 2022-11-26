import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationModalComponent } from './authentication-modal/authentication-modal.component';
import {SharedModule} from "../shared/shared.module";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        AuthenticationModalComponent,
        LoginComponent,
        RegisterComponent
    ],
    exports: [
        AuthenticationModalComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class UserModule { }
