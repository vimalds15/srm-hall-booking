import {
    StyleSheet,
    Text,
    View,
    Modal,
    Pressable,
  } from "react-native";
  import React from "react";
  
  const InfoModal = ({
    modalVisible,
    setModalVisible,
    booked
  }) => {
  
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Booked By</Text>
              <Text style={{ fontWeight: "bold", marginBottom: 6 }}>
                Faculty: {booked?.name}
              </Text>
              <Text style={{ fontWeight: "bold", marginBottom: 6 }}>
                Purpose: {booked?.purpose}
              </Text>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textCancelStyle}>Close</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  
  export default InfoModal;
  
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 5,
      padding: 25,
      // alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      minWidth: "70%",
    },
    button: {
      borderRadius: 5,
      padding: 10,
      marginTop:10
    },
    buttonOpen: {
      backgroundColor: "green",
      marginRight: 10,
    },
    buttonClose: {
      borderColor: "#111",
      borderWidth: 1,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
    },
    textCancelStyle: {
      fontWeight: "bold",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontWeight: "bold",
    },
    descText: {
      minHeight: 150,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 15,
      padding: 10,
      width: "100%",
    },
  });
  