import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import {AntDesign}  from '@expo/vector-icons';
import { MapsScreen, NewPlaceScreen, PlaceDetailScreen, PlaceListScreen } from "../screens/index";
import colors from "../utils/colors";

const Stack = createNativeStackNavigator();

const PlacesNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Place"
      screenOptions={{
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? colors.primary : colors.secondary,
        },
        headerTintColor: colors.black,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}>
      <Stack.Screen 
      name="Places" 
      component={PlaceListScreen} 
      options={({ navigation }) => ({
        title: "Addresses",
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate("NewPlace")}>
            <AntDesign name="pluscircleo" size={24} color="black" />
          </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="PlaceDetail"
        component={PlaceDetailScreen}
        options={{ title: "Addresses Details" }}
      />
      <Stack.Screen
        name="NewPlace"
        component={NewPlaceScreen}
        options={{ title: "New Address" }}
      />
      <Stack.Screen name="Maps" component={MapsScreen} options={{ title: "Map" }} />
    </Stack.Navigator>
  );
};

export default PlacesNavigator;
