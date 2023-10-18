import { Image, StyleSheet, Pressable,Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LH from "../../../assets/lh.png"
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import { getSlots } from '../../features/firebase/slotsDB'
import SlotModal from '../../components/SlotModal'

const DetailScreen = () => {
  const [slots,setSlots] = useState(null)
  const [modalVisible,setModalVisible]=useState(false)
  const [selectedSlot,setSelectedSlot]=useState(null)
  const [selectedSlotId,setSelectedSlotId]=useState(null)
  const [selectedSlotDuration,setSelectedSlotDuration]=useState(null)

  const navigation = useNavigation()
  const {params} = useRoute();
  const {id,name}=params?.data;

  console.log("id",id)

  const fetchData = async () => {
    const res = await getSlots(id);
    setSlots(res);
  }

  const slotClickHandler = (slotId,name,duration) => {
    setModalVisible(!modalVisible)
    setSelectedSlotId(slotId)
    setSelectedSlot(name)
    setSelectedSlotDuration(duration)
  }

  useEffect(()=> {
    navigation.setOptions({
        headerTitle:`${name}`,
        headerTitleAlign:"center"
    })
    fetchData()
  },[id,slots?.length])

  return (
      <View style={{flex:1,padding:15,backgroundColor:"#FFF"}}>
      <Image source={LH} style={{width:"100%", height:225}} /> 
      <Text style={{marginTop:10, fontWeight:"bold"}}>{name}</Text>
      <Text style={{marginTop:10, fontWeight:"bold"}}>Choose the Slot</Text>
      <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"space-evenly",rowGap:10,marginTop:20}}>
        {slots?.map(slot => 
        <Pressable onPress={()=>slotClickHandler(slot.id,slot.name,slot.duration)} key={slot.id} style={{width:"40%",borderWidth:1,borderColor:`${slot.status==='booked'?"red":"green"}`,alignSelf:"center",padding:10}}>
            <Text style={{textAlign:"center"}}>Hour {slot.name}</Text>
            <Text style={{textAlign:"center"}}>{slot.duration}</Text>
        </Pressable>
        )}
      </View>
      <SlotModal 
        modalVisible={modalVisible}
        setModalVisible={setModalVisible} 
        selectedSlot={selectedSlot}
        selectedSlotId={selectedSlotId}
        selectedSlotDuration={selectedSlotDuration}
        selectedLH={name}
        hallId={id}
        />
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({})