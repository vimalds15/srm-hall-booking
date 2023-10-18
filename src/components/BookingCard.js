import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const BookingCard = ({ bookingId, duration, hall, purpose, status,slot }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Booking Id: <Text style={{fontWeight:"normal"}}>{bookingId}</Text></Text>
      <Text style={styles.text}>Hall: <Text style={{fontWeight:"normal"}}>{hall}</Text></Text>
      <Text style={styles.text}>Slot: <Text style={{fontWeight:"normal"}}>{slot}</Text></Text>
      <Text style={styles.text}>Duration: <Text style={{fontWeight:"normal"}}>{duration}</Text></Text>
      <Text style={styles.text}>Purpose: <Text style={{fontWeight:"normal"}}>{purpose}</Text></Text>
      <Text style={styles.text}>Status: <Text style={{fontWeight:"bold",color:`${status==='pending'?"#a69002":status==="rejected"?"#8B0000":"green"}`}}>{status.toUpperCase()}</Text></Text>
    </View>
  );
};

export default BookingCard;

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
    elevation: 2,
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
    marginBottom: 6,
    fontWeight: "bold",
  },
  
});
