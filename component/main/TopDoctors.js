import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

const topDoctors = [
  {
    id: "1",
    name: "Dr. Alice Johnson",
    specialty: "Pediatrician",
    room: "Room 302",
    rating: 5.0,
    image:
      "https://i.pinimg.com/236x/1a/f2/96/1af296e06610dd46944892fe29441231.jpg",
  },
  {
    id: "2",
    name: "Dr. Robert Brown",
    specialty: "Orthopedic Surgeon",
    room: "Room 201",
    rating: 4.8,
    image:
      "https://i.pinimg.com/236x/95/e7/ba/95e7bac37f9b3c17e8652b4631f2801e.jpg",
  },
];

const TopDoctors = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Doctors</Text>
      <FlatList
        data={topDoctors}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.specialty}>{item.specialty}</Text>
            <Text style={styles.room}>{item.room}</Text>
            <Text style={styles.rating}>{item.rating} ★</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 300,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 200,
    height: 250,
    justifyContent: "flex-start",
    alignItems: "center",
    marginRight: 15,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginTop: 10,
  },
  specialty: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
  room: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
  },
  rating: {
    fontSize: 14,
    color: "#FFD700",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default TopDoctors;
