import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import IUser from "../models/user.model";
import {Observable} from "rxjs";
import {map, delay} from 'rxjs/operators'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private collection: AngularFirestoreCollection<IUser>
    public isAuth$: Observable<boolean>
    public isAuthDelayed$: Observable<boolean>

    constructor(private auth: AngularFireAuth, private database: AngularFirestore, private router: Router) {
        this.collection = database.collection('user')
        this.isAuth$ = auth.user.pipe(
            map(user => Boolean(user))
        )
        this.isAuthDelayed$ = this.isAuth$.pipe(
            delay(1000)
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

        user.user?.updateProfile({
            displayName: userData.name
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

    public async logout($event?: Event){
        if($event){
            $event.preventDefault()
            }

        await this.auth.signOut()

        await this.router.navigateByUrl('/');
    }
}
