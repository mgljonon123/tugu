import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Search = () => {
  const [query, setQuery] = useState("");
  const navigation = useNavigation();

  const handleSearch = async () => {
    if (query.trim() !== "") {
      try {
        await AsyncStorage.setItem("lastSearch", query);
      } catch (error) {
        console.error("Failed to save search query:", error);
      }
      navigation.navigate("AllDoctor");
    } else {
      navigation.navigate("Home", { query });
    }
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch} // Pressing enter triggers search
      />
      <TouchableOpacity onPress={handleSearch}>
        <Ionicons
          name="search"
          size={24}
          color="#888"
          style={styles.searchIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  searchIcon: {
    marginLeft: 10,
  },
});

export default Search;
