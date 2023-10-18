import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginScreen from "../screens/authentication/LoginScreen"
import RegisterScreen from "../screens/authentication/RegisterScreen"
import { useState } from "react";
import HomeScreen from "../screens/home/HomeScreen";
import DetailScreen from "../screens/home/DetailScreen";
import HodHomeScreen from "../screens/hod/HodHomeScreen";
import BookingScreen from "../screens/booking/BookingScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Stack = createNativeStackNavigator();

export const AuthenticationStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="login-screen" component={LoginScreen} /> 
            <Stack.Screen name="register-screen" component={RegisterScreen} />
        </Stack.Navigator>
    )
}

export const MainStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="home-screen">
            <Stack.Screen name="home-screen" component={HomeScreen} />
            <Stack.Screen name="detail-screen" component={DetailScreen} />
        </Stack.Navigator>
    )
}
export const BookingStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="booking-screen" component={BookingScreen} />
        </Stack.Navigator>
    )
}
export const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator>
             <Stack.Screen name="profile-screen" component={ProfileScreen} />
        </Stack.Navigator>
    )
}
export const HodStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="detail-screen">
            <Stack.Screen name="home-screen" component={HodHomeScreen} />
        </Stack.Navigator>
    )
}