// import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { View, Image, Text, Alert, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapPreview from "../map-preview";
import colors from "../../utils/colors";
import { styles } from "./styles";
import * as Location from "expo-location";

const LocationSelector = ({ onLocationPicker }) => {
    const [pickedLocation, setPickedLocation] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();

    const mapLocation = route?.params?.mapLocation;

    const verifyPermissions = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if ( status !== "granted" ) {
        Alert.alert("Not Allowed", "You need a permission to get the Location", [
          { text: "Ok" },
        ]);
        return false;
      }
      return true;
    };

    const onHandleGetLocation = async () => {
      const isLocationPermitted = await verifyPermissions();
      if (!isLocationPermitted) return;

      const location = await Location.getCurrentPositionAsync({
        timeout: 5000,
      });

      const {latitude, longitude} = location.coords;

      setPickedLocation({lat: latitude, lng: longitude});

      onLocationPicker({ lat: latitude, lng: longitude });

    };

    const onHandleMapLocation = async () => {
      const isLocationPermission = await verifyPermissions();
      if (!isLocationPermission) return;
      navigation.navigate("Maps");
    };

    useEffect(() => {
      if (mapLocation) {
        setPickedLocation(mapLocation);
        onLocationPicker(mapLocation);
      }
    }, [mapLocation]);

    return (
        <View style={styles.container}>
          <View style={styles.preview}>
            <MapPreview location={pickedLocation} style={styles.mapPreview}>
              <Text style={styles.title}>No Location Selected</Text>
            </MapPreview>
          </View>
          <View style={styles.buttonsContainer}>
            <Button title="Get Location" color={colors.primary} onPress={onHandleGetLocation} />
            <Button title=" Search Map " color={colors.primary} onPress={onHandleMapLocation} />
          </View>
      </View>
    );
}

export default LocationSelector;