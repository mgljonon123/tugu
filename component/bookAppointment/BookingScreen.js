import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";

const BookingScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // Modal төлөв

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Header - Буцах сум */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Appointment</Text>
      </View>

      {/* Үндсэн агуулга */}
      <View style={styles.content}>
        <Text style={styles.title}>Select a date </Text>

        {/* Календарийн хэсэг */}
        <View style={styles.calendarContainer}>
          <Calendar
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: "#79AC9E" },
            }}
            onDayPress={onDayPress}
            monthFormat={"yyyy MM"}
            style={styles.calendar}
          />
        </View>

        {/* Сонгосон огноо */}
        {selectedDate && (
          <Text style={styles.selectedDate}>Selected Date: {selectedDate}</Text>
        )}

        {/* Сонгох цагийн хэсэг */}
        <Text style={styles.selectHour}>Select Hour</Text>
        <View style={styles.timeButtons}>
          {["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"].map(
            (time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeButton,
                  selectedTime === time && styles.selectedTimeButton,
                ]}
                onPress={() => handleTimeSelect(time)}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === time && styles.selectedTimeText,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </View>

      {/* Confirm товч */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.confirmButton, !selectedTime && styles.disabledButton]}
          onPress={handleConfirm}
          disabled={!selectedTime}
        >
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>

      {/* Custom Modal Popup */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Ionicons name="checkmark-circle" size={60} color="#007AFF" />
            <Text style={styles.modalTitle}>Congratulations!</Text>
            <Text style={styles.modalText}>
              Your appointment on {selectedDate} at {selectedTime} is confirmed!
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 50,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  calendarContainer: {
    width: "100%",
    marginVertical: 10,
  },
  calendar: {
    borderWidth: 1,
    borderColor: "#79AC9E",
    borderRadius: 10,
    padding: 10,
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 16,
    color: "000000",
  },
  selectHour: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },
  timeButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "100%",
  },
  timeButton: {
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#79AC9E",
    borderRadius: 10,
  },
  selectedTimeButton: {
    backgroundColor: "#79AC9E",
  },
  timeText: {
    fontSize: 16,
    color: "#000",
  },
  selectedTimeText: {
    color: "#fff",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#000000",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
  },
  disabledButton: {
    backgroundColor: "#A0A0A0",
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  /* Modal styles */
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  modalButton: {
    marginTop: 15,
    backgroundColor: "#79AC9E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BookingScreen;
