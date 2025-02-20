import React, { useState } from "react"; // useState-г оруулж ирнэ
import { ScrollView, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Icon сан
import Card from "./card";
import Rating from "./rating";
import AboutMe from "./aboutMe";
import WorkingTime from "./workingTime";
import Reviews from "./reviews";

const DoctorDetailsScreen = ({ navigation }) => {
  const [isFavorited, setIsFavorited] = useState(false); // Зүрхний статусыг хадгалах

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("HomeScreen"); // Эхний хуудас руу буцаах
    }
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited); // Зүрхний статусыг солино
  };

  return (
    <View style={styles.container}>
      {/* Header - Буцах сум, Гарчиг, Зүрх */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctor Details</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Ionicons 
            name={isFavorited ? "heart" : "heart-outline"} // Зүрхний статусын дагуу тэмдэгтийг харуулна
            size={28} 
            color={isFavorited ? "red" : "black"} // Зүрхний өнгийг статусын дагуу тодорхойлно
          />
        </TouchableOpacity>
      </View>

      {/* Үндсэн агуулга */}
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Card 
          name="Dr. David Patel"
          specialty="Cardiologist"
          location="Golden Cardiology Center"
          image="https://via.placeholder.com/150"
        />
        <Rating patients="2000" experience="10" rating="5" reviews="1872" />
        <AboutMe description="Dr. David Patel, a dedicated cardiologist, brings a wealth of experience to Golden Gate Cardiology Center in Golden Gate, CA." />
        <WorkingTime time="Monday-Friday, 08:00 AM - 18:00 PM" />
        <Reviews reviewer="Emily Anderson" rating="5.0" comment="Dr. Patel is a true professional who genuinely cares about his patients." />
      </ScrollView>

      {/* Доод хэсэг - Book Appointment товч */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate("BookingScreen")}
        >
          <Text style={styles.buttonText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 50,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  button: {
    backgroundColor: "#1C2A3A",
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DoctorDetailsScreen;
