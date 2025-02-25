import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Icon сан

const Category = () => {
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.categoryCard}>
          <Ionicons name="medkit" size={30} color="#79ac9d" />
          <Text style={styles.categoryText}>Neurology</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryCard}>
          <Ionicons name="pulse" size={30} color="#79ac9d" />
          <Text style={styles.categoryText}>Gastroenterology</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryCard}>
          <Ionicons name="flask" size={30} color="#79ac9d" />
          <Text style={styles.categoryText}>Laboratory</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryCard}>
          <Ionicons name="shield-checkmark" size={30} color="#79ac9d" />
          <Text style={styles.categoryText}>Vaccinations</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5, // Текст болон icon-ийн хооронд зай
  },
});

export default Category;
