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
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const logoUrl =
  "https://www.diamondsmile.cz/wp-content/uploads/2022/05/logo_CMYK_D.png";

export default function CreateAccountScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [phone, setPhone] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [experience, setExperience] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleCreateAccount = async () => {
    try {
      const formData = new FormData();

      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role.toUpperCase());

      if (role === "doctor") {
        formData.append("phone", phone.toString());
        formData.append("experience", experience);
      }

      formData.append("aboutMe", aboutMe);

      // Append image if selected
      if (profileImage) {
        formData.append("profilePicture", {
          uri: profileImage,
          name: "profile.jpg",
          type: "image/jpeg",
        });
      }

      console.log("Uploading data...");

      const response = await axios.post(
        "http://192.168.88.27:3000/users/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { token } = response.data;
      if (token) {
        await AsyncStorage.setItem("userToken", token);
        console.log("Token stored successfully.");
      } else {
        console.log("No token received from server.");
      }

      console.log("Account created successfully:", response.data);
      Alert.alert("Success", "Account Created Successfully!");
      navigation.navigate("Login");
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
      <Text style={styles.subtitle}>Create Your Account</Text>

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

      <Text style={styles.label}>Select Role:</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[
            styles.radioButton,
            role === "patient" && styles.radioSelected,
          ]}
          onPress={() => setRole("patient")}
        >
          <Text
            style={[
              styles.radioText,
              role === "patient" && styles.radioTextSelected,
            ]}
          >
            Patient
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.radioButton,
            role === "doctor" && styles.radioSelected,
          ]}
          onPress={() => setRole("doctor")}
        >
          <Text
            style={[
              styles.radioText,
              role === "doctor" && styles.radioTextSelected,
            ]}
          >
            Doctor
          </Text>
        </TouchableOpacity>
      </View>

      {role === "doctor" && (
        <View style={styles.doc}>
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <Text style={styles.imagePickerText}>
                Tap to Select Profile Picture
              </Text>
            )}
          </TouchableOpacity>
          <View style={styles.doc2}>
            <TextInput
              style={styles.input}
              placeholder="Your Phone Number"
              keyboardType="default"
              value={phone}
              onChangeText={setPhone}
            />
            <TextInput
              style={styles.input}
              placeholder="Years of Experience"
              keyboardType="numeric"
              value={experience}
              onChangeText={setExperience}
            />
            <TextInput
              style={[styles.input, styles.aboutMeInput]}
              placeholder="Tell us about yourself..."
              multiline
              numberOfLines={4}
              value={aboutMe}
              onChangeText={setAboutMe}
            />
          </View>
        </View>
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
    padding: 25,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  radioTextSelected: {
    color: "#fff",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  doc: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: "14%",
  },
  doc2: {
    width: "60%",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 15,
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    borderColor: "#ddd",
  },
  aboutMeInput: {
    height: 100,
    textAlignVertical: "top",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    alignSelf: "flex-start",
    color: "#444",
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
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 5,
    borderColor: "#bbb",
  },
  radioSelected: {
    backgroundColor: "black",
  },
  radioText: {
    fontSize: 16,
    color: "black",
  },
  imagePicker: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
    marginLeft: "10",
    marginTop: "20",
  },
  imagePickerText: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 65,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
