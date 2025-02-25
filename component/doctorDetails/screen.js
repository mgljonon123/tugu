import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Card from "./card";
import Rating from "./rating";
import AboutMe from "./aboutMe";
import WorkingTime from "./workingTime";
import Reviews from "./reviews";

const DoctorDetailsScreen = ({ navigation }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const storedQuery = await AsyncStorage.getItem("lastSearch");
        if (!storedQuery) {
          console.warn("No search query found.");
          setLoading(false);
          return;
        }

        // Fetch doctor details from API
        const response = await fetch(
          `https://192.168.88.27:3000/doctors/${storedQuery}`
        );
        const data = await response.json();

        // Parse availableDays if it's stored as a string
        data.availableDays = data.availableDays
          ? JSON.parse(data.availableDays)
          : [];

        setDoctor(data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, []);

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("HomeScreen");
    }
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1C2A3A" />
      </View>
    );
  }

  if (!doctor) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          No doctor found. Please search again.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleGoBack}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctor Details</Text>
        <TouchableOpacity onPress={toggleFavorite}>
          <Ionicons
            name={isFavorited ? "heart" : "heart-outline"}
            size={28}
            color={isFavorited ? "red" : "black"}
          />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Card
          name={`Dr. ${doctor.userId}`}
          specialty={doctor.specialization}
          location={`Phone: ${doctor.phone}`}
          image={`https://your-api-url.com${doctor.profileImage}`}
        />
        <Rating
          patients="N/A"
          experience={`${doctor.experience} years`}
          rating="N/A"
          reviews="N/A"
        />
        <AboutMe description={doctor.aboutMe || "No details available"} />
        <WorkingTime
          time={
            doctor.availableDays.length > 0
              ? doctor.availableDays.join(", ")
              : "No available days"
          }
        />

        {/* Example review section (replace with actual data if available) */}
        <Reviews reviewer="Anonymous" rating="5.0" comment="Great doctor!" />
      </ScrollView>

      {/* Footer */}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    marginBottom: 20,
  },
});

export default DoctorDetailsScreen;
