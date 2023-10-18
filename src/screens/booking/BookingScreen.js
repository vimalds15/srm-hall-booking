import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../../features/context/authContext";
import BookingCard from "../../components/BookingCard";
import BookingContext from "../../features/context/bookingContext";
import { getBookings } from "../../features/firebase/bookingDB";

const BookingScreen = () => {
  const [refresh, setRefresh] = useState(false);
  const { bookings, setBookings } = useContext(BookingContext);
  const { currentUser } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Booking",
      headerTitleAlign: "left",
    });
  }, []);

  const fetchBookings = async () => {
    setRefresh(true);
    const data = await getBookings(currentUser.uid);
    setBookings(data);
    setRefresh(false);
  };

  useEffect(() => {
    fetchBookings();
  }, [bookings?.length]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 15 }}>
      <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: "bold" }}>
        Your Booking <Text style={{ color: "#a69002" }}>History</Text>
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => fetchBookings(currentUser.uid)}
          />
        }
      >
        {bookings?.map((data) => (
          <BookingCard key={data.bookingId} {...data} />
        ))}
      </ScrollView>
    </View>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({});
