import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import IUser from "../models/user.model";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private collection: AngularFirestoreCollection<IUser>
    public isAuth$: Observable<boolean>

    constructor(private auth: AngularFireAuth, private database: AngularFirestore) {
        this.collection = database.collection('user')
        this.isAuth$ = auth.user.pipe(
            map(user => Boolean(user))
        )
    }

    public async createUser(userData: IUser) {
        if (!userData.password) {
            throw new Error('Please provide a password!')
        }

        const user = await this.auth.createUserWithEmailAndPassword(userData.email as string, userData.password as string)

        if (!user.user) {
            throw new Error("User not provided");
        }

        await this.collection.doc(user.user?.uid).set({
            name: userData.name,
            email: userData.email,
            age: userData.age,
            phoneNumber: userData.phoneNumber
        })
    }

    public async logUser(email: string, password: string){
        if(!email){
            throw new Error('Please provide an email!')
        }

        if(!password){
            throw new Error('Please provide a password!')
        }

        await this.auth.signInWithEmailAndPassword(email, password)
    }
}
