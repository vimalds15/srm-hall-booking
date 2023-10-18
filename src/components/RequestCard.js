import { Pressable, StyleSheet, Text, View, ToastAndroid } from "react-native";
import React, { useContext } from "react";
import {
  getSlotByIdAndUpdateRejected,
  getSlotByIdAndUpdateStatus,
} from "../features/firebase/slotsDB";
import HodContext from "../features/context/hodContext";

const RequestCard = ({
  faculty,
  slotId,
  duration,
  date,
  purpose,
  hall,
  hallId,
  id,
  userId,
}) => {
  const { requests, setRequests } = useContext(HodContext);

  const removeItem = (id) => {
    const newRequests = requests.filter((item) => item.id != id);
    setRequests(newRequests);
  };

  const approveHandler = async () => {
    const res = await getSlotByIdAndUpdateStatus(
      hallId,
      slotId,
      id,
      userId,
      "booked"
    );
    if (res.success) {
      removeItem(id);
      console.log("successfully approved");
      ToastAndroid.show("Approved successfully!!", ToastAndroid.BOTTOM);
    }
  };

  const rejectHandler = async () => {
    const res = await getSlotByIdAndUpdateRejected(id, userId, "rejected");
    if (res.success) {
      removeItem(id);
      console.log("successfully Rejected");
      ToastAndroid.show("Rejected successfully!!", ToastAndroid.BOTTOM);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Slot Id: <Text style={{ fontWeight: "normal" }}>{slotId}</Text>
      </Text>
      <Text style={styles.text}>
        Hall: <Text style={{ fontWeight: "normal" }}>{hall}</Text>
      </Text>
      <Text style={styles.text}>
        Faculty: <Text style={{ fontWeight: "normal" }}>{faculty}</Text>
      </Text>
      <Text style={styles.text}>
        Duration: <Text style={{ fontWeight: "normal" }}>{duration}</Text>
      </Text>
      <Text style={styles.text}>
        Request Date: <Text style={{ fontWeight: "normal" }}>{date}</Text>
      </Text>
      <Text style={styles.text}>
        Purpose: <Text style={{ fontWeight: "normal" }}>{purpose}</Text>
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={approveHandler}
        >
          <Text style={styles.textStyle}>Approve</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={rejectHandler}
        >
          <Text style={styles.textCancelStyle}>Reject</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RequestCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 20,
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
    padding: 10,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  buttonOpen: {
    backgroundColor: "green",
    marginRight: 10,
  },
  buttonClose: {
    borderColor: "#111",
    borderWidth: 1,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  textCancelStyle: {
    fontWeight: "bold",
  },
  text: {
    marginBottom: 8,
    fontWeight: "bold",
  },
});
