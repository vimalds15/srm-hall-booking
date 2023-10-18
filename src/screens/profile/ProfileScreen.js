import {
  Text,
  View,
  Image,
  Pressable,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect } from "react";
import User from "../../../assets/user.png";
import AuthContext from "../../features/context/authContext";
import { logout } from "../../features/firebase/userAuth";

const ProfileScreen = ({ navigation }) => {
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } =
    useContext(AuthContext);

  const handleLogout = async () => {
    const res = await logout();
    if (res.success === true) {
      ToastAndroid.show("Logged out Successfully!", ToastAndroid.BOTTOM);
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Profile",
      headerTitleAlign: "center",
    });
  });

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.subContainer}>
          <View className={styles.imageCont}>
            <Image source={User} style={styles.image} />
          </View>
        </View>
        <View style={styles.infoCont}>
          <View className="items-center justify-center">
            <Text style={styles.text}>
              {currentUser?.name}
            </Text>
            <Text style={styles.emailText}>
              {currentUser?.email}
            </Text>
            <Text style={styles.emailText}>
              Role: {currentUser?.role.toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.btnCont}>
        <Pressable
          onPress={handleLogout}
          style={styles.btn}
          className="bg-black w-full py-4 rounded-lg"
        >
          <Text style={styles.btnText}>Log Out</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 6,
    justifyContent: "space-between",
  },
  subContainer: {
    marginTop: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  imageCont: {
    borderWidth: 20,
    borderColor: "gray",
    marginTop: 150,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 70 / 2,
  },
  infoCont:{
    marginTop:15
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom:3
  },
  emailText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    fontWeight:"600",
    marginBottom:2
  },
  btnCont:{
    justifyContent:"center",
    alignItems:"center"
  },
  btn:{
    backgroundColor:"black",
    paddingVertical:14,
    width:"100%",
  },
  btnText:{
    color:"white",
    fontWeight:"bold",
    textAlign:"center"
  }
});
