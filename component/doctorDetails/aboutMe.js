import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AboutMe = ({ description }) => (
  <View style={styles.container}>
    <Text style={styles.title}>About me</Text>
    <Text style={styles.description}>{description}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 20, // 🆕 Доошлуулах
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
});

export default AboutMe;

