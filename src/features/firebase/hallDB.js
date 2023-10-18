import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

export const getHalls = async ()=> {
    try {
        const hallsRef = collection(db,"halls");
        const querySnapshot = await getDocs(hallsRef);

        if(querySnapshot.empty){
            console.log("No data")
            return [];
        }        

        const hallsList = [];
        querySnapshot.forEach((doc)=>{
            hallsList.push({...doc.data()})
        })

        return hallsList;

    } catch (error) {
        console.error("Error rertrieving halls: ",error)
        return [];
    }
}