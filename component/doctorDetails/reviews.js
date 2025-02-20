import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Reviews = ({ reviewer, rating, comment }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Reviews</Text>
    <View style={styles.reviewContainer}>
      <FontAwesome name="user-circle" size={24} color="black" />
      <View style={styles.reviewContent}>
        <Text style={styles.reviewer}>{reviewer}</Text>
        <Text style={styles.rating}>⭐ {rating}</Text>
        <Text style={styles.comment}>{comment}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: { marginVertical: 10, padding: 15,  elevation: 2 }, // Background color and border radius
  sectionTitle: { fontSize: 19, fontWeight: "bold", marginBottom: 10 },
  reviewContainer: { flexDirection: "row", alignItems: "center" },
  reviewContent: { marginLeft: 10, flex: 1 }, // Flex for proper spacing
  reviewer: { fontWeight: "bold", fontSize: 16 },
  rating: { color: "#FFD700", fontSize: 14 }, // Gold color for rating stars
  comment: { marginTop: 5, fontSize: 14, color: "#555" }, // Lighter color for comment text
});

export default Reviews;
