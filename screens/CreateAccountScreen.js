import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import axios from "axios";

const logoUrl =
  "https://www.diamondsmile.cz/wp-content/uploads/2022/05/logo_CMYK_D.png";

export default function CreateAccountScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient"); // Default role
  const [phone, setPhone] = useState(""); // For phone number input (ensure it's a string)

  const handleCreateAccount = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.23:4000/users/register", // ✅ Replace with your local IP
        {
          fullName,
          email,
          password,
          role: role.toUpperCase(),
          phone: role === "doctor" ? phone.toString() : undefined, // Ensure phone is always a string
        }
      );

      Alert.alert("Success", "Account Created Successfully!");

      navigation.navigate("FillProfile");
    } catch (error) {
      console.log("Registration Error:", error.response?.data || error.message);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: logoUrl }} style={styles.logo} />
      <Text style={styles.title}>Diamond Smile</Text>
      <Text style={styles.subtitle}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Role Selection */}
      <Text style={styles.label}>Select Role:</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[
            styles.radioButton,
            role === "patient" && styles.radioSelected,
          ]}
          onPress={() => setRole("patient")}
        >
          <Text style={styles.radioText}>Patient</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.radioButton,
            role === "doctor" && styles.radioSelected,
          ]}
          onPress={() => setRole("doctor")}
        >
          <Text style={styles.radioText}>Doctor</Text>
        </TouchableOpacity>
      </View>

      {/* Phone number input for doctors */}
      {role === "doctor" && (
        <TextInput
          style={styles.input}
          placeholder="Your Phone Number"
          keyboardType="default"
          value={phone}
          onChangeText={(text) => setPhone(text)} // Ensures it's treated as a string
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
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
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  radioButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  radioSelected: {
    backgroundColor: "black",
  },
  radioText: {
    fontSize: 16,
    color: "black",
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
