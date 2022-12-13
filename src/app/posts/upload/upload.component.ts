import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../services/post.service";
import IPost from "../../models/post.model";

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
    image: string = '';

    constructor(private postService: PostService) {
    }

    uploadForm = new FormGroup({
        title: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(16),
        ]),
        description: new FormControl('', [
            Validators.required,
            Validators.minLength(30),
        ]),
        image: new FormControl('', [
            Validators.required
        ])
    })

    ngOnInit(): void {
    }

    async createPost(event: Event){
        event.preventDefault()

        const post = {
            title: this.uploadForm.controls.title.value as string,
            description: this.uploadForm.controls.description.value as string,
            imageUrl: this.image
        }
        await this.postService.createPost(post as IPost)
    }

    imageUpload(event: Event) {
        let target = event.target as HTMLInputElement
        const reader = new FileReader()

        if(target.files){
            if(target.files[0].type !== 'image/jpg' && target.files[0].type !== 'image/jpeg' && target.files[0].type !== 'image/webp' && target.files[0].type !== 'image/png'){
                this.uploadForm.controls.image.setErrors({ wrongType: true})
                return
            }
        }

        if(target.files && target.files.length){
            const files = target.files[0] as Blob

            reader.readAsDataURL(files)

            reader.onload = () => {
                this.image = reader.result as string
            }
        }
    }
}
