import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const logoUrl =
  "https://www.diamondsmile.cz/wp-content/uploads/2022/05/logo_CMYK_D.png"; // Replace with your actual logo URL

export default function CreateAccountScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: logoUrl }} style={styles.logo} />
      <Text style={styles.title}>Diamond smile </Text>
      <Text style={styles.subtitle}>Create Account</Text>

      <TextInput style={styles.input} placeholder="Your Name" />
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        keyboardType="email-address"
      />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("FillProfile")}
      >
        <Text style={styles.buttonText}>Create Account</Text>
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
  logo: { width: 100, height: 100, marginBottom: 20 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: { fontSize: 18, textAlign: "center", marginBottom: 20 },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
