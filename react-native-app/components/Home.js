// @ts-check

import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";


export default function Home({ navigation }) {
  return (

    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="#4FD0E9" />
      <Text>Home</Text>
      <Text></Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SwipeScreen")}
      >
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </View>
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
  button: {
    width: 200,
    height: 50,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
});
