import { firebaseConfig } from "./config";
import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import { 
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// const firebaseConfig = {
//   apiKey: "AIzaSyA7kA9miFlZwnoKNnK8suWoElfoutEhUWs",
//   authDomain: "netflixclone-2e875.firebaseapp.com",
//   projectId: "netflixclone-2e875",
//   storageBucket: "netflixclone-2e875.appspot.com",
//   messagingSenderId: "552546254058",
//   appId: "1:552546254058:web:6a4fa4c8ef1fa39bb1eb93"
// };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password );
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};