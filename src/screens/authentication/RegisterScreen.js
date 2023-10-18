import React, { useContext, useState } from 'react';
import { View, Text, TextInput, StyleSheet,ToastAndroid, Pressable,Image} from 'react-native';
import { Link } from '@react-navigation/native';
import Logo from "../../../assets/logo.png"
import SelectDropdown from 'react-native-select-dropdown';
import { registerWithEmailAndPassword } from '../../features/firebase/userAuth';
import AuthContext from '../../features/context/authContext';
import BookingContext from '../../features/context/bookingContext';

const roles=["Faculty","HOD"]

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role,setRole]=useState('')
  const {setIsLoggedIn,setCurrentUser} = useContext(AuthContext)
  const {setBookings} =useContext(BookingContext); 

  const handleRegister = async () => {

    try {
        const res = await registerWithEmailAndPassword(name,email,password,role);
        if(res.success){
            setCurrentUser(res.user)
            setIsLoggedIn(true)
            setBookings(res.user.booking)
            ToastAndroid.show("Registered successfully!!", ToastAndroid.BOTTOM);
        }
    } catch (error) {
        console.error(error.message)
    }
  };

  return (
    <View style={styles.container}>
      <Image style={{height:100,width:100}} source={Logo}/>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        value={name}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Email"
        keyboardType='email-address'
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <SelectDropdown 
        data={roles}
        onSelect={(val)=>setRole(val.toLowerCase())}
        defaultButtonText='Select your role'
        buttonStyle={styles.input}
      />
      <Pressable onPress={handleRegister} style={{backgroundColor:"gold", paddingHorizontal:20, paddingVertical:15,borderRadius:5}}>
        <Text style={{textAlign:"center",color:"black",fontWeight:"bold"}}>Register</Text>
      </Pressable>
      <Text style={styles.text}>Already a User? <Link style={{color:"#a69002"}} to={'/login-screen'}>Login</Link></Text>
    </View>
  );
};

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
  },
  input: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  text:{
    marginTop:10
  }
});

export default RegisterScreen;
