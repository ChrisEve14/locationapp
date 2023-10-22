import { useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { PlaceItem } from "../../components";
import { styles } from "./styles";
import { loadPlaces } from "../../store/place.slice";

const PlaceList = ({ navigation }) => {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.place.places);

  // console.warn("places", places);

  useEffect(() => {
    dispatch(loadPlaces());
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <PlaceItem
      {...item}
      onSelect={() => navigation.navigate("PlaceDetail", { placeId: item.id })}
    />
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No places added</Text>
    </View>
  );

  return (
    <FlatList
    style={styles.container}
    data={places}
    keyExtractor={(item) => item.id.toString()}
    renderItem={renderItem}
    ListEmptyComponent={ListEmptyComponent}
  />
  );
};

export default PlaceList;
