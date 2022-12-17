import firebase from "firebase/compat/app";

export default interface IPost{
    id?: string,
    author?: string,
    title: string,
    description: string,
    imageUrl: string,
    timestamp: firebase.firestore.Timestamp
}
