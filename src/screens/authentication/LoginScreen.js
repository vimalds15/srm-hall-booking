import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,Image,ToastAndroid, Pressable } from 'react-native';
import Logo from "../../../assets/logo.png"
import { Link } from '@react-navigation/native';
import { loginWithEmailAndPassword } from '../../features/firebase/userAuth';
import AuthContext from '../../features/context/authContext';
import BookingContext from '../../features/context/bookingContext';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setIsLoggedIn,setCurrentUser} =useContext(AuthContext); 
  const {setBookings} =useContext(BookingContext); 

  const handleLogin = async () => {
    const res = await loginWithEmailAndPassword(email,password);
    if(res.success){
        setIsLoggedIn(true)
        setBookings(res.user.booking)
        setCurrentUser(res.user)
        ToastAndroid.show("Logged In successfully!!", ToastAndroid.BOTTOM);
    }
  }

  return (
    <View style={styles.container}>
      <Image style={{height:100,width:100}} source={Logo}/>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Pressable onPress={handleLogin} style={{backgroundColor:"gold", paddingHorizontal:20, paddingVertical:15,borderRadius:5}}>
        <Text style={{textAlign:"center",color:"black",fontWeight:"bold"}}>Login</Text>
      </Pressable>
      <Text style={styles.text}>Not a User? <Link style={{color:"#a69002"}} to={'/register-screen'}>Register</Link></Text>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:"#FFF"
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      marginTop:20
    },
    input: {
      width: '80%',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
    },
    text:{
      marginTop:10
    }
  });