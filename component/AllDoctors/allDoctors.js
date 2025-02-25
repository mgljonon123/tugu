import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Search from "./search";
import Category from "./category";
import Doctors from "./doctors";

const AllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://192.168.88.27:3000/doctors/getall"
        );
        console.log(response.data);
        setDoctors(response.data); // Store all doctors
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={doctors}
      keyExtractor={(item) => item.id.toString()} // Ensure ID is a string
      ListHeaderComponent={
        <>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={28} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>All Doctors</Text>
          </View>

          <View style={styles.searchContainer}>
            <Search />
          </View>
          <Category />
        </>
      }
      renderItem={({ item }) => <Doctors doctor={item} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: "20",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: -10,
    flex: 1,
    textAlign: "center",
  },
  searchContainer: {
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AllDoctors;
