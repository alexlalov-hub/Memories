import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

    @Input() modalId = ''
    constructor(public modal: ModalService) {

    }

    ngOnInit(): void {
    }

    closeModal(){
        this.modal.toggleModal(this.modalId)
    }
}
