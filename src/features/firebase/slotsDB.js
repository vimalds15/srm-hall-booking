import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore"
import { db } from "../../../firebase"

export const getSlots = async (hallId)=>{
    try {
        const hallsRef = collection(db,"halls");
        const hallDocRef= doc(hallsRef,hallId);
        const slotsRef = collection(hallDocRef,'slots')
        const querySnapshot = await getDocs(slotsRef);

        if (querySnapshot.empty){
            console.log("empty slots")
            return []
        }
        const slotsList = [];
        querySnapshot.forEach((doc)=>{
            slotsList.push({...doc.data()})
        })

        return slotsList;

    } catch (error) {
        console.error(error)
        return []
    }
}

const deleteRequest = async (requestId) => {
    try {
      const hodRef = collection(db, 'hod');
      const requestDocRef = doc(hodRef, requestId);
      await deleteDoc(requestDocRef);
      console.log(`Request document with ID ${requestId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting request document with ID ${requestId}:`, error);
    }
  };

const updateUserBookingStatus = async (userId,bookingId,status) => {
    try {
        const usersRef = collection(db, "users");
        const userDocRef = doc(usersRef, userId);
        const userDoc = await getDoc(userDocRef);
    
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (!userData.booking) {
            userData.booking = [];
          }
          userData.booking = userData.booking.map((booking) => {
            if (booking.bookingId === bookingId) {
                // Update the status property of the matching booking.
                return { ...booking, status };
              }
              return booking;
        });

        await setDoc(userDocRef, userData);
        }
      } catch (error) {
        console.log(error);
      }
}

export const getSlotByIdAndUpdateRejected = async (requestId,userId,status)=>{
    try {
        await updateUserBookingStatus(userId,requestId,status)
        await deleteRequest(requestId)
        return {success:true};
    } catch (error) {
        console.error(error)
    }
}



export const getSlotByIdAndUpdateStatus = async (hallId, slotId,requestId,userId,status,faculty,purpose) => {
    try {
      const hallsRef = collection(db, 'halls');
      const hallDocRef = doc(hallsRef, hallId);
      const slotsRef = collection(hallDocRef, 'slots');
      const slotDocRef = doc(slotsRef, slotId);
      const slotDoc = await getDoc(slotDocRef);
      const usersRef = collection(db, "users");
      const userDocRef = doc(usersRef, userId);
      const userDoc = await getDoc(userDocRef);
  
      if (slotDoc.exists()) {
        // Update the status property of the slot to "approved." and merge will preserve other properties
        await setDoc(slotDocRef, { status,booked:{name:faculty,purpose} }, { merge: true });
        await updateUserBookingStatus(userId,requestId,status)
        await deleteRequest(requestId)
        return {success:true};
      } else {
        console.log(`Slot document with ID ${slotId} not found in hall ${hallId}`);
        return null;
      }
    } catch (error) {
      console.error(`Error updating and retrieving slot with ID ${slotId} in hall ${hallId}:`, error);
      return null;
    }
  };
