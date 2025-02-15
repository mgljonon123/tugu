import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CongratulationsScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("CreateAccount");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {/* Back Button (Arrow) */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>🎉 Congratulations!</Text>
      <Text style={styles.message}>
        Your account is ready to use. You will be redirected to the Home Page in
        a few seconds.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CreateAccount")}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  backButton: { position: "absolute", top: 50, left: 20, zIndex: 1 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  message: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  button: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
