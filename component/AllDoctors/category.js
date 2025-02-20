import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

const categories = [
  { id: "1", title: "Cardiology" },
  { id: "2", title: "Neurology" },
  { id: "3", title: "Dermatology" },
  { id: "4", title: "Pediatrics" },
  { id: "5", title: "Orthopedics" },
];

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handlePress = (id) => {
    setSelectedCategory(id); // Сонгогдсон ангиллыг шинэчилнэ
  };

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoryList}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.categoryButton,
            selectedCategory === item.id && styles.selectedCategory,
          ]}
          onPress={() => handlePress(item.id)}
          activeOpacity={0.7} // Товчлуурын дарсны үед тодорхой намхан байдлыг хангах
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === item.id && styles.selectedCategoryText,
            ]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  categoryList: {
    paddingVertical: 10,
  },
  categoryButton: {
    backgroundColor: "#fff", // Баз өнгө
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1, // Хүрээ нэмэх
    borderColor: "#black", // Хүрээний өнгө
  },
  selectedCategory: {
    backgroundColor: "#79AC9E", // Сонгосон үед өөр өнгө
  },
  categoryText: {
    color: "#black", // Товчлуур сонгогдоогүй үед
    fontWeight: "bold",
  },
  selectedCategoryText: {
    color: "#fff", // Сонгосон үед текстийн өнгө
  },
});

export default Category;
