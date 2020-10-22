import React, { Component } from "react";
import { StyleSheet, View, StatusBar, Image, TouchableOpacity, Button, Text, ImageBackground } from "react-native";

function SplashScreen({ navigation }) {
  return (
    <View
      style={styles.container}
    >
      <ImageBackground
        source={require("../../assets/images/green-plant-on-white-wooden-table-36447421.jpg")}
        style={styles.image2}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TutorialsScreen')}
        >
          <View style={styles.containerButton} >
            <Text styles={styles.text} >Get Started</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image2: {
    height: '100%',
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 50,
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  containerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  getstarted: {
    height: 60
  },
  button: {
    width: 300,
    height: 60,
    backgroundColor: "rgba(255,255,255,1)",
    borderWidth: 1,
    borderColor: "rgba(112,112,112,1)",
    borderStyle: "solid",
    borderRadius: 100,
    marginBottom: 60

  },
  text: {
    fontFamily: "comfortaa-regular",
    color: "#121212",
  }
});

export default SplashScreen;
