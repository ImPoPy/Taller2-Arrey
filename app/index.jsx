import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Title, Button, Text } from "react-native-paper";
import { router } from "expo-router";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/img/logo1.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Title style={styles.title}>BIENVENIDO</Title>
      <Text variant="bodyLarge" style={styles.subtitle}>
        Me alegra tenerte con nosotros
      </Text>
      <Button
        mode="contained"
        onPress={() => router.push("/menu")}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        EMPEZAR
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", 
    padding: 16,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000000",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 32,
    color: "#666666",
  },
  button: {
    backgroundColor: "#1976D2",
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});