import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { HodTabNavigator, MainTabNavigator } from "./src/navigators/TabNavigation";
import { useState } from "react";
import {
  AuthenticationStackNavigator
} from "./src/navigators/StackNavigation";
import { AuthProvider } from "./src/features/context/authContext";
import { BookingProvider } from "./src/features/context/bookingContext";
import { HodProvider } from "./src/features/context/hodContext";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookings, setBookings] = useState(null);
  const [requests,setRequests]=useState(null)
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <AuthProvider
      value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }}
    >
      <BookingProvider value={{ bookings, setBookings }}>
        <HodProvider value={{requests,setRequests}}>
          <NavigationContainer>
            {isLoggedIn ? (
              currentUser?.role == "faculty" ? (
                <MainTabNavigator />
              ) : (
                <HodTabNavigator />
              )
            ) : (
              <AuthenticationStackNavigator />
            )}
            {/* {isLoggedIn ? <MainTabNavigator /> : <AuthenticationStackNavigator />} */}
          </NavigationContainer>
        </HodProvider>
      </BookingProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
