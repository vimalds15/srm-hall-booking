import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";


export const getBookings = async (userId) => {
    try {
        const usersRef = collection(db, "users");
        const userDocRef = doc(usersRef, userId);
        const userDoc = await getDoc(userDocRef);
    
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (!userData.booking) {
            userData.booking = [];
          }
          return userData.booking;
        }
      } catch (error) {
        console.log(error);
      }
}