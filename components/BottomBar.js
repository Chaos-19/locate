import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import SlidingUpPanel from "rn-sliding-up-panel";

import { ApplicationContext } from '../context/ContextProvider';
import { useContext, useState } from 'react';

const BottomBar = ({ height }) => {


  const [longitudeIn, onChangeLongitudeIn] = useState(null);
  const [latitudeIn, onChangeLatitudeIn] = useState(null);

  const [markerInfo, setMarkerInfo] = useState("");

  const { addMarker } = useContext(ApplicationContext);


  const handleAddMarker = (latitudeIn, longitudeIn) => {
    if (latitudeIn && longitudeIn) {
      console.log(latitudeIn, longitudeIn)
      addMarker("default marker",
        {
          latitude: Number(latitudeIn),
          longitude: Number(longitudeIn),
        })
    }
  }


  return (
    <SlidingUpPanel
      ref={c => (this._panel = c)}
      draggableRange={{ top: height / 1.75, bottom: 120 }}
      animatedValue={this._draggedValue}
      showBackdrop={false}>
      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
        <View style={styles.title}>
          <Text style={{
            fontSize: 19
          }}>ADD Marker</Text>
        </View>

        <View style={styles.inputWraper}>

          <View style={styles.wrap}>
            <Text style={styles.lable}>latitude</Text>
            <TextInput
              style={styles.inputs}
              placeholder='lat'
              onChangeText={(input) => { onChangeLatitudeIn(input) }}
              value={latitudeIn}
            />
          </View>
          <View style={styles.wrap}>
            <Text style={styles.lable}>longitude</Text>
            <TextInput
              style={styles.inputs}
              placeholder='lat'

              onChangeText={(input) => {
                onChangeLongitudeIn(input)
              }}
              value={longitudeIn}
            />
          </View>

          <View style={styles.wrap}>
            <Text style={styles.lable}>Add Tage</Text>
            <TextInput
              style={styles.inputs}
              placeholder="Add Description"

              onChangeText={(input) => {
                setMarkerInfo(input)
              }}
              value={markerInfo}
            />
          </View>

          <View style={styles.btnWapper}>
            <TouchableOpacity onPress={() => handleAddMarker(latitudeIn, longitudeIn)}>
              <Text style={styles.btnWapper}>
                Locate Lcation
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </SlidingUpPanel>
  )
}

export default BottomBar

const styles = StyleSheet.create({
  title: {
    alignItems: "center",
    width: "100%",
    paddingBottom: 15,
    padding: 5,
    paddingBottom: 60
  }, wrap: {
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 7,
    flexDirection: "row",
    width: "100%",

  },
  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
    borderRadius: 30,
    paddingHorizontal: 10
  },
  panelHeader: {
    padding: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
  },
  inputs: {
    flex: 0.7,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    borderColor: "black",
    fontSize: 16
  },
  inputWraper: {
    flex: 1,
    gap: 10
  },
  lable: {
    fontSize: 18,
    marginRight: 6,
    textTransform: "uppercase"
  },
  btnWapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    borderRadius: 15,
    fontSize: 20,
    marginTop: 8,
    padding: 4,
  }

})