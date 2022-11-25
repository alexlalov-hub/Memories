import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";

@Component({
    selector: 'app-authentication-modal',
    templateUrl: './authentication-modal.component.html',
    styleUrls: ['./authentication-modal.component.css']
})
export class AuthenticationModalComponent implements OnInit, OnDestroy {

    constructor(public modal: ModalService) {
    }

    ngOnInit(): void {
        this.modal.register('auth')
    }

    ngOnDestroy() {
        this.modal.unregister('auth')
    }

}
