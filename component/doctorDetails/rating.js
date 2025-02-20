import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"; // Icon сан 

const Rating = ({ patients, experience, rating, reviews }) => (
  <View style={styles.ratingContainer}>
    <View style={styles.ratingItem}>
      <FontAwesome name="user" size={24} color="#1C2A3A" />
      <Text style={styles.number}>{patients}+</Text>
      <Text style={styles.label}>patients</Text>
    </View>
    <View style={styles.ratingItem}>
      <MaterialIcons name="work" size={24} color="#1C2A3A" />
      <Text style={styles.number}>{experience}+</Text>
      <Text style={styles.label}>years experience</Text>
    </View>
    <View style={styles.ratingItem}>
      <FontAwesome name="star" size={24} color="#1C2A3A" />
      <Text style={styles.number}>{rating}</Text>
      <Text style={styles.label}>rating</Text>
    </View>
    <View style={styles.ratingItem}>
      <MaterialIcons name="rate-review" size={24} color="#1C2A3A" />
      <Text style={styles.number}>{reviews}</Text>
      <Text style={styles.label}>reviews</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 15,
  },
  ratingItem: {
    alignItems: "center",
  },
  number: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  label: {
    fontSize: 12,
    color: "#555",
  },
});

export default Rating;

