import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Dimensions,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
export default function ProfileScreen({ navigation }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogOut = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        Alert.alert("Error", "No active session found!");
        return;
      }

      console.log("Retrieved Token:", token); // Debugging Step

      await axios.post(
        "http://192.168.88.27:3000/users/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await AsyncStorage.removeItem("userToken"); // Clear token from storage
      setIsModalVisible(false);
      navigation.navigate("Login"); // Redirect to login
      Alert.alert("Success", "Logged out successfully!");
    } catch (error) {
      console.error("Logout Error:", error.response?.data || error.message);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to log out."
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Section */}
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/45.jpg" }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Daniel Bernard</Text>
        <Text style={styles.profileEmail}>user@example.com</Text>

        {/* Profile Options */}
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile")}
          style={styles.optionButton}
        >
          <Ionicons name="person-outline" size={20} color="black" />
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Favorites")}
          style={styles.optionButton}
        >
          <Ionicons name="heart-outline" size={20} color="black" />
          <Text style={styles.buttonText}>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Notifications")}
          style={styles.optionButton}
        >
          <Ionicons name="notifications-outline" size={20} color="black" />
          <Text style={styles.buttonText}>Notifications</Text>
        </TouchableOpacity>

        {/* Log Out Button */}
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={styles.optionButton}
        >
          <Ionicons name="log-out-outline" size={20} color="black" />
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Menu */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.menuItem}
        >
          <Ionicons name="home-outline" size={30} color="black" />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Calendar")}
          style={styles.menuItem}
        >
          <Ionicons name="calendar-outline" size={30} color="black" />
          <Text style={styles.menuText}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.menuItem}
        >
          <Ionicons name="person-circle-outline" size={30} color="black" />
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>
      </View>
      {/* Log Out Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={[styles.modalButton, styles.cancelButton]}
              >
                <Text style={[styles.modalButtonText, styles.cancelText]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLogOut}
                style={[styles.modalButton, styles.logoutButton]}
              >
                <Text style={styles.modalButtonText}>Yes, Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 60,
  },
  profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  profileName: { fontSize: 24, fontWeight: "bold" },
  profileEmail: { fontSize: 16, color: "gray", marginBottom: 20 },

  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    width: "80%",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "transparent",
  },
  buttonText: { color: "black", fontSize: 16, marginLeft: 10 },

  bottomMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  menuItem: { alignItems: "center" },
  menuText: { fontSize: 12, color: "black" },

  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: Dimensions.get("window").width,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    padding: 15,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  logoutButton: {
    backgroundColor: "black",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelText: {
    color: "black",
  },
});
