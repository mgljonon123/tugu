import React, { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Search = () => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getSearchData = async () => {
      try {
        const storedSearch = await AsyncStorage.getItem("lastSearch");
        if (storedSearch) {
          setSearch(storedSearch);
        }
      } catch (error) {
        console.error("Error retrieving search data from AsyncStorage", error);
      }
    };

    getSearchData();
  }, []);

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="#888"
        value={search}
        onChangeText={setSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginVertical: 10,
    marginBottom: 1,
  },
  searchInput: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 16,
  },
});

export default Search;
