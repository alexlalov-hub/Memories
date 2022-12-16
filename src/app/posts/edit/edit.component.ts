import {AfterContentChecked, AfterContentInit, Component, OnChanges, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import IPost from "../../models/post.model";
import {PostService} from "../../services/post.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
    id = ''
    post: IPost | null = null
    constructor(private postService: PostService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.id = params.id
        })

        this.postService.getPostById(this.id).then(post => {
            this.post = null

            post?.forEach(doc => {
                this.post = {
                    id: doc.id,
                    ...doc.data() as IPost
                }
                this.editForm.controls.title.setValue(this.post?.title)
                this.editForm.controls.description.setValue(this.post?.description)
            })
        })
    }

    editForm = new FormGroup({
        title: new FormControl('',[
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(16),
        ]),
        description: new FormControl('',[
            Validators.required,
            Validators.minLength(30),
        ])
    })

    public async submit(){
        await this.postService.updatePost(this.id, this.editForm.controls.title.value as string, this.editForm.controls.description.value as string)
    }
}
