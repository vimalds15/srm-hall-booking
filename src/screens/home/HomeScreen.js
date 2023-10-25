import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigation } from '@react-navigation/native';
import Logo from "../../../assets/logo.png"
import HallCard from '../../../src/components/HallCard'
import AuthContext from '../../features/context/authContext';
import { getHalls } from '../../features/firebase/hallDB';

const HomeScreen = () => {
  const [halls,setHalls] = useState(null);
  const {currentUser}=useContext(AuthContext)

  const navigation = useNavigation()

  const fetchData = async () => {
    const res = await getHalls();
    setHalls(res)
    console.log(res)
  }

  useEffect(()=>{
    
    fetchData()

    navigation.setOptions({
      headerTitle:"",
      headerRight:() => <Text style={{marginRight:15}}>Hi {currentUser?.name}!</Text>,
      headerLeft:() => (
        <Image source={Logo} style={{marginLeft:15,height:50,width:50}} />
      )
    })
  },[currentUser?.uid])

  return (
    <View style={{flex:1,backgroundColor:"#fff",padding:15}}>
      <Text style={{marginBottom:10,fontSize:20,fontWeight:"bold"}}>Book Your <Text style={{color:"#a69002"}}>Hall</Text></Text>
      <ScrollView
        style={{flex:1}}
      >
        {halls?.map(data=>
        <Link style={{marginBottom:20}} key={data.id} to={{screen:'detail-screen',params:{data}}}>
          <HallCard {...data} />
        </Link>
        )}
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})