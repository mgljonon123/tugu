// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";

// import axios from "axios";
// import Search from "./search";
// import Category from "./category";
// import Doctors from "./doctors";

// const AllDoctors = () => {
//   const [doctors, setDoctors] = useState([]);

//   const navigation = useNavigation();
//   // const doctors = [
//   //   { id: "1", name: "Dr. John Doe", specialty: "Cardiologist" },
//   //   { id: "2", name: "Dr. Jane Smith", specialty: "Neurologist" },
//   //   { id: "3", name: "Dr. Emily White", specialty: "Dermatologist" },
//   //   { id: "4", name: "Dr. Emily White", specialty: "Dermatologist" },
//   // ];

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await axios.get("http://192.168.1.23:4000/doctors/");
//         setDoctors(response.data);
//       } catch (error) {
//         console.error("Error fetching doctors:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctors();
//   }, []);

//   return (
//     <FlatList
//       style={styles.container}
//       data={doctors}
//       keyExtractor={(item) => item.id}
//       ListHeaderComponent={
//         <>
//           <View style={styles.header}>
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//               <Ionicons name="arrow-back" size={28} color="black" />
//             </TouchableOpacity>
//             <Text style={styles.title}>All Doctors</Text>
//           </View>

//           {/* Хайлт */}
//           <View style={styles.searchContainer}>
//             <Search />
//           </View>

//           {/* Ангилал */}
//           <Category />
//           <Doctors></Doctors>
//         </>
//       }

//       // renderItem={({ item }) => (
//       //   <Doctors doctor={item} />
//       // )}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingHorizontal: 20,
//     paddingTop: 0,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginLeft: 10,
//     marginRight: 120,
//   },
// });

// export default AllDoctors;

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
  const [loading, setLoading] = useState(true); // Added loading state

  const navigation = useNavigation();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://192.168.88.27:3000/doctors/getall"
        );
        console.log(response.data);
        setDoctors(response.data.length > 0 ? [response.data[0]] : []); // Store only one doctor
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  console.log(doctors);

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

          {/* Search and Category */}
          <View style={styles.searchContainer}>
            <Search />
          </View>
          <Category />
        </>
      }
      renderItem={({ item }) => <Doctors doctor={item} />} // Pass doctor data
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
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
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
