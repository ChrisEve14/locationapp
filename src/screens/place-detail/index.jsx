import { View, Text, ScrollView, Image } from "react-native";
import { useSelector } from "react-redux";

import MapPreview from "../../components/map-preview";
import { styles } from "./styles";

const PlaceDetail = ({ navigation, route }) => {
  const { placeId } = route.params;

  const place = useSelector((state) => state.place.places.find((place) => place.id === placeId));
  // console.warn(place);
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: place.image }} style={styles.image} />
      <View style={styles.location}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{place.address}</Text>
        </View>
        <MapPreview style={styles.map} location={{ lat: place.coords.lat, lng: place.coords.lng }}>
          <Text>Location not available</Text>
        </MapPreview>
      </View>
    </ScrollView>
  );
};

export default PlaceDetail;