import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const Card = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("AllDoctor")}>
      <View style={styles.card}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Looking for Specialist Doctors?</Text>
        </View>
        <Image
          source={{
            uri: "https://i.pinimg.com/236x/58/13/54/5813541e3030570da328b4248a3535af.jpg",
          }}
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row", // Зураг болон текстийг нэг мөрөнд байрлуулна
    backgroundColor: "#79AC9E",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: "100%",
    height: 150,
    alignItems: "center", // Төвд нь байршуулна
  },
  textContainer: {
    flex: 1, // Текстийн контейнерийг өргөжүүлнэ
    justifyContent: "center",
  },
  image: {
    width: 130, // Зургийн өргөн
    height: 120, // Зургийн өндөр
    borderRadius: 10, // Зургийг дугуй хэлбэртэй болгох
    marginLeft: 10, // Зурагтай текстийн хооронд зай
  },
  text: {
    fontSize: 20, // Текстийн хэмжээ
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Card;
