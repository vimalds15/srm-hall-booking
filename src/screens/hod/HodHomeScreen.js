import { Image, ScrollView, StyleSheet, Text, View,RefreshControl } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import Logo from "../../../assets/logo.png"
import AuthContext from '../../features/context/authContext';
import { getRequests } from '../../features/firebase/hodDB';
import RequestCard from '../../components/RequestCard';
import HodContext from '../../features/context/hodContext';

const HodHomeScreen = () => {
    const [refresh, setRefresh] = useState(false);
    
  const {requests,setRequests} = useContext(HodContext);

  const {currentUser}=useContext(AuthContext)

  const navigation = useNavigation()

  const fetchRequestsData = async () => {
    setRefresh(true)
    const res = await getRequests();
    setRequests(res)
    setRefresh(false)
    console.log(res)
  }

  useEffect(()=>{
    fetchRequestsData()

    navigation.setOptions({
      headerTitle:"",
      headerRight:() => <Text style={{marginRight:15}}>Hi {currentUser?.name}!</Text>,
      headerLeft:() => (
        <Image source={Logo} style={{height:50,width:50,marginLeft:15}} />
      )
    })
  },[currentUser?.uid])

  return (
    <View style={{flex:1,backgroundColor:"#fff",padding:15}}>
      <Text style={{marginBottom:10,fontSize:20,fontWeight:"bold"}}>Monitor the <Text style={{color:"#a69002"}}>Requests</Text></Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={fetchRequestsData} />
        }>
        {requests?.map(data=>
          <RequestCard key={data.id} {...data} />
        )}
      </ScrollView>
    </View>
  )
}

export default HodHomeScreen

const styles = StyleSheet.create({})