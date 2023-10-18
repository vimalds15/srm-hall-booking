import { Dimensions,Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LH from "../../assets/lh.png"

const HallCard = ({name}) => {

  const windowWidth = Dimensions.get('window').width;
  const newWidth=windowWidth-(windowWidth*0.1);

  return (
    <View style={styles.container}>
      <Image source={LH} style={{flex:1,width:newWidth,height:200}} />
      <Text style={{marginTop:8,marginLeft:12, marginBottom:10,fontWeight:"bold"}}>{name}</Text>
    </View>
  )
}

export default HallCard

const styles = StyleSheet.create({
    container:{
        flex:1,
        borderWidth:1,
        borderColor:"gray",
        borderRadius:8,
        overflow:"hidden",
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        marginBottom:20
    }
})