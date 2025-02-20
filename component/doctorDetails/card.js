import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Card = ({ name, specialty, location }) => {
  const image = "https://i.pinimg.com/236x/e1/ad/63/e1ad63235ce8a7d9ac8846d50056eb0e.jpg"; // Зургийн URL

  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: image }} 
        style={styles.profileImage} 
        resizeMode="cover" // Зургийг бүрэн дүүргэх
      />
      <View style={styles.cardText}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.specialty}>{specialty}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 30,
    marginRight: 15,
  },
  cardText: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  specialty: {
    color: "#555",
  },
  location: {
    color: "#888",
  },
});

export default Card;
