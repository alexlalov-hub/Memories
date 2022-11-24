import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationModalComponent } from './authentication-modal/authentication-modal.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
    declarations: [
        AuthenticationModalComponent
    ],
    exports: [
        AuthenticationModalComponent
    ],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class UserModule { }
