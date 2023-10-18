import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase";

const addStatusToUser = async (
  userId,
  bookingId,
  hall,
  duration,
  purpose,
  slot,
  status
) => {
  try {
    const usersRef = collection(db, "users");
    const userDocRef = doc(usersRef, userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      if (!userData.booking) {
        userData.booking = [];
      }
      const newBooking = { bookingId, hall, duration, purpose, status, slot };
      userData.booking = [newBooking,...userData.booking];
      await setDoc(userDocRef, userData);
    }
  } catch (error) {
    console.log(error);
  }
};

export const addRequestToHod = async (data) => {
  try {
    const hodRef = collection(db, "hod");
    const newDocRef = await addDoc(hodRef, data);
    const newRequest = {
      id: newDocRef.id,
      ...data,
    };
    await setDoc(newDocRef, newRequest);
    newStatus={
        bookingId:newDocRef.id,
        status:"pending",
        ...data
    }
    addStatusToUser(
        data.userId,
        newDocRef.id,
        data.hall,
        data.duration,
        data.purpose,
        data.slot,
        "pending"
    );
    return { success: true,data:newStatus };
  } catch (error) {
    console.error(error);
  }
};

export const getRequests = async () => {
  try {
    const hodRef = collection(db, "hod");
    const querySnapshot = await getDocs(hodRef);

    if (querySnapshot.empty) {
      console.log("No data");
      return [];
    }

    const requestsList = [];
    querySnapshot.forEach((doc) => {
      requestsList.push({ ...doc.data() });
    });

    return requestsList;
  } catch (error) {
    console.error("Error rertrieving requests: ", error);
    return [];
  }
};