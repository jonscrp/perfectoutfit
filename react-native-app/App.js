import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./components/Home";
import SwipeScreen from "./components/SwipeScreen";
import OutfitScreen from "./components/Outfits";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SwipeScreen" component={SwipeScreen} />
        <Stack.Screen name="OutfitScreen" component={OutfitScreen}/>
        {/* <Stack.Screen name="CreateOutfit" component={CreateOutfit} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
});
