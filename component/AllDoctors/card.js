import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // ✅ Navigation ашиглах

const Card = () => {
  const navigation = useNavigation(); // ✅ Navigation утгыг дуудаж авна

  return (
    <TouchableOpacity onPress={() => navigation.navigate("AllDoctors")}>
      <View style={styles.card}>
        <Text style={styles.text}>Looking for Specialist Doctors?</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#79AC9E",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center", // ✅ Текстийг төвд нь байршуулах
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // ✅ Хар өнгөтэй бол харагдахгүй байж магадгүй тул цагаан болгоно
  },
});

export default Card;
