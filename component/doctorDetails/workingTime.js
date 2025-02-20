import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WorkingTime = ({ time }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Working Time</Text>
    <Text style={styles.time}>{time}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 25, // 🆕 Доошлуулах
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  time: {
    fontSize: 14,
    color: "#555",
  },
});

export default WorkingTime;
