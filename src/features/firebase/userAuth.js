import {auth,db} from "../../../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getDoc, doc, setDoc} from "firebase/firestore"

export const loginWithEmailAndPassword = async(email,password)=>{
    try{
        const res = await signInWithEmailAndPassword(auth,email,password)
        const userId = res.user.uid;
        console.log("usersdf",userId)
        const userRef= doc(db,"users",userId)
        const userDoc = await getDoc(userRef)
        console.log("user",userDoc.data())
        return {
            success:true,
            user:userDoc.data()
        }
    }catch(err){
        console.error(err)
    }
}

export const registerWithEmailAndPassword = async(name,email,password,role)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password)
        const user = res.user;
        const userDocRef = doc(db,"users",user.uid)
        const newUser = {
            uid:user.uid,
            name,
            email,
            role
        }
        await setDoc(userDocRef,newUser)
        return {success:true,user:newUser};
        
    } catch (error) {
        console.error(error)
    }
}

export const logout = async() => {
    await signOut(auth)
    return {success:true}
}