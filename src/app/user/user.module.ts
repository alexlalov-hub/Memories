import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationModalComponent } from './authentication-modal/authentication-modal.component';



@NgModule({
    declarations: [
        AuthenticationModalComponent
    ],
    exports: [
        AuthenticationModalComponent
    ],
    imports: [
        CommonModule
    ]
})
export class UserModule { }
