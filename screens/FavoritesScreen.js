import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([
    {
      id: "1",
      name: "Dr. Sarah Paul",
      specialty: "Cardiologist",
      image: "https://randomuser.me/api/portraits/women/21.jpg",
      rating: 4.5,
      views: 120,
    },
    {
      id: "2",
      name: "Dr. Jessica Turner",
      specialty: "Dermatologist",
      image: "https://randomuser.me/api/portraits/women/22.jpg",
      rating: 4.0,
      views: 200,
    },
    {
      id: "3",
      name: "Dr. Emily Watson",
      specialty: "Neurologist",
      image: "https://randomuser.me/api/portraits/women/23.jpg",
      rating: 5.0,
      views: 350,
    },
    {
      id: "4",
      name: "Dr. John Doe",
      specialty: "Orthopedist",
      image: "https://randomuser.me/api/portraits/men/20.jpg",
      rating: 4.3,
      views: 150,
    },
    {
      id: "5",
      name: "Dr. Rachel Green",
      specialty: "Pediatrician",
      image: "https://randomuser.me/api/portraits/women/25.jpg",
      rating: 4.8,
      views: 300,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [doctorToRemove, setDoctorToRemove] = useState(null);

  const openRemoveModal = (doctor) => {
    setDoctorToRemove(doctor);
    setModalVisible(true);
  };

  const handleRemove = () => {
    // Logic to remove doctor from favorites
    setFavorites((prevFavorites) =>
      prevFavorites.filter((doctor) => doctor.id !== doctorToRemove.id)
    );
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.doctorImage} />
            <View style={styles.cardInfo}>
              <Text style={styles.doctorName}>{item.name}</Text>
              <Text style={styles.specialty}>{item.specialty}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={20} color="gold" />
                <Text style={styles.rating}>{item.rating}</Text>
                <Text style={styles.views}> | Views: {item.views}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => openRemoveModal(item)}>
              <Ionicons name="heart" size={30} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
      {/* Modal for Remove confirmation */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Remove from favorites?</Text>
            <View style={styles.modalCard}>
              <Image
                source={{ uri: doctorToRemove?.image }}
                style={styles.modalDoctorImage}
              />
              <View style={styles.modalCardInfo}>
                <Text style={styles.modalDoctorName}>
                  {doctorToRemove?.name}
                </Text>
                <Text style={styles.modalSpecialty}>
                  {doctorToRemove?.specialty}
                </Text>
                <View style={styles.modalRatingContainer}>
                  <Ionicons name="star" size={18} color="gold" />
                  <Text style={styles.modalRating}>
                    {doctorToRemove?.rating}
                  </Text>
                  <Text style={styles.modalViews}>
                    {" "}
                    | Views: {doctorToRemove?.views}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={handleCancel}
                style={[styles.modalButton, styles.cancelButton]}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleRemove}
                style={[styles.modalButton, styles.removeButton]}
              >
                <Text style={styles.buttonTextWhite}>Yes, Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2, //
    shadowColor: "#000", //
    shadowOpacity: 0.1, //
    shadowRadius: 5, //
    shadowOffset: { width: 0, height: 3 },
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  cardInfo: { flex: 1 },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  specialty: {
    fontSize: 16,
    color: "gray",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  rating: {
    fontSize: 16,
    marginLeft: 5,
  },
  views: {
    fontSize: 14,
    color: "gray",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    width: "100%",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  modalCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  modalDoctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  modalCardInfo: { flex: 1 },
  modalDoctorName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalSpecialty: {
    fontSize: 16,
    color: "gray",
  },
  modalRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  modalRating: {
    fontSize: 16,
    marginLeft: 5,
  },
  modalViews: {
    fontSize: 14,
    color: "gray",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  modalButton: {
    padding: 12,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
  },
  removeButton: {
    backgroundColor: "black",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
  buttonTextWhite: {
    color: "white",
    fontSize: 16,
  },
});
