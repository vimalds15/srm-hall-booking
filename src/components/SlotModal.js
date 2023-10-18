import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  Pressable,
  ToastAndroid,
  ActivityIndicator
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { addRequestToHod } from "../features/firebase/hodDB";
import BookingContext from "../features/context/bookingContext";
import AuthContext from "../features/context/authContext";

const SlotModal = ({
  modalVisible,
  setModalVisible,
  selectedSlot,
  selectedSlotId,
  selectedSlotDuration,
  selectedLH,
  hallId
}) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const {currentUser}= useContext(AuthContext)
  const uid = currentUser?.uid;

  const {setBookings} = useContext(BookingContext);

  const submitHandler = async () => {
    setLoading(true)
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const data = {
      slotId: selectedSlotId,
      slot:selectedSlot,
      userId: uid,
      purpose: description,
      duration: selectedSlotDuration,
      date: formattedDate,
      faculty:"Dhanush Sundar S",
      hall:selectedLH,
      hallId
    };
    const res = await addRequestToHod(data);
    if (res.success) {
      setLoading(false)
      setBookings((prev)=>[res.data,...prev])
      setModalVisible(false);
      ToastAndroid.show("Request sent successfully", ToastAndroid.BOTTOM);
    }
  };

  useEffect(() => {
    setDescription("");
  }, [selectedSlotId]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Book the Slot {selectedSlot}</Text>
            <Text style={{ fontWeight: "bold", marginBottom: 6 }}>
              Purpose:
            </Text>
            <TextInput
              multiline
              onChangeText={(text) => setDescription(text)}
              value={description}
              placeholder="Enter your purpose of booking"
              placeholderTextColor={"gray"}
              style={styles.descText}
            />
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {loading
            ?
                <ActivityIndicator />
            :
            <>
              <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={submitHandler}
              >
                <Text style={styles.textStyle}>Confirm</Text>
              </Pressable>
              <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textCancelStyle}>Cancel</Text>
              </Pressable>
            </>
            }
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SlotModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 25,
    // alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: "70%",
  },
  button: {
    borderRadius: 5,
    padding: 10,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  descText: {
    minHeight: 150,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
    width: "100%",
  },
});
