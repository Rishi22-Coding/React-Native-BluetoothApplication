import React, { useState } from "react";
import { Platform, PermissionsAndroid, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AppRegistry } from "react-native";
import BleManager from "react-native-ble-manager";
import BLEAdvertiser from 'react-native-ble-advertiser'
import { NativeEventEmitter, NativeModules } from 'react-native';
import { stringToBytes } from "convert-string";
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import BluetoothDevices from "react-native-bluetooth-devices";

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const DATA = [
  {
    id: "firstItem",
    title: "First Item",
  },
  {
    id: "secondItem",
    title: "Second Item",
  },
  {
    id: "thirdItem",
    title: "Third Item",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

// const UUID = "6ce9768e-c170-7595-3c45-e3e19fe5ed0a";
// const macID = "B4:E6:2D:BF:4F:37";
// const data = stringToBytes(UUID);

const App = () => {
  
  
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

// function connectToPeripheral(peripheral) {
//   try {
//       BleManager.connect(peripheral.id)  //98:F4:AB:6E:F4:86
//           .then(() => {
//               console.log("Connected to bluetooth device");
//               //ToastAndroid.show("Connected to the Bluetooth device", ToastAndroid.SHORT)
//               saveBluetoothPeripheral(peripheral);
//               retrieveServicesOfPeripheral(peripheral.id);
//           })
//           .catch((err) => {
//               console.log("Error in Ble Manager connect. Err: " + err);
//           })
//   }
//   catch (err) {

//   }
// }

function retrieveServicesOfPeripheral(peripheralId) {
  BleManager.retrieveServices(peripheralId).then((peripheralData) => {
      console.log('Retrieved peripheral services', JSON.stringify(peripheralData));
      savePeripheralServices(peripheralData);
      BleManager.readRSSI(peripheralId).then((rssi) => {
          console.log('Retrieved actual RSSI value', JSON.stringify(rssi));
          BleManager.startNotificationUseBuffer(peripheralId, serviceCharacteristic, notifyCharacteristic, 1).then(() => {
              console.log('Started notification on ' + peripheralId);
              typeOfLastMessageSent = PATIENT_ADMIT;
              writeToBluetoothDevice(getPatientAdmitMessage());
          }).catch((error) => {
              console.log('Notification error', error);
          });
      });


      //BleManager.write(peripheralId, serviceCharacteristic, writeCharacteristic, stringToBytes("hello Narayanan"), 512)

      /*
       BleManager.read(    //Retrieve services has to be called before Read
           peripheralId,
           serviceCharacteristic,  //0x1700 //6E400001-B5A3-F393-E0A9-E50E24DCCA9E
           readCharacteristic   //0x1A00 //6E400003-B5A3-F393-E0A9-E50E24DCCA9E
         ).then((readData) => {
           // Success code
           console.log("Read output: " + readData);
           let buffer = Buffer.Buffer.from(readData); //https://github.com/feross/buffer#convert-arraybuffer-to-buffer
           let sensorData = buffer.toString()//.readUInt8(2, true);
           console.log("read sensor data: " + sensorData);
           decryptData(sensorData);
         }).catch((error) => {
           console.log('read error', error);
         });

       console.log("trying to connect using notify")
*/
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
