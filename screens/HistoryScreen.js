import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import {
  Search,
  FileText,
  Share2,
  Trash2,
  Eye,
  IndianRupee,
  CalendarDays,
  UserRound,
  Phone,
} from "lucide-react-native";

export default function HistoryScreen() {

  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);

  const [search, setSearch] = useState("");

  const [todaySales, setTodaySales] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalBills, setTotalBills] = useState(0);

  const [selectedBill, setSelectedBill] = useState(null);

  useEffect(() => {
    loadBills();
  }, []);

  useEffect(() => {

    const result = bills.filter((bill) => {

      const customer =
        (bill.customer || "").toLowerCase();

      const phone =
        (bill.phone || "").toLowerCase();

      const text = search.toLowerCase();

      return (
        customer.includes(text) ||
        phone.includes(text)
      );

    });

    setFilteredBills(result);

  }, [search, bills]);

  async function loadBills() {
  try {
    const data = await AsyncStorage.getItem("bills");

    const parsedBills = data ? JSON.parse(data) : [];

    setBills(parsedBills);
    setFilteredBills(parsedBills);

    setTotalBills(parsedBills.length);

    let total = 0;
    let today = 0;

    const todayDate = new Date().toLocaleDateString();

    parsedBills.forEach((bill) => {
      const amount = Number(bill.total || 0);

      total += amount;

      if (bill.date === todayDate) {
        today += amount;
      }
    });

    setTotalSales(total);
    setTodaySales(today);

  } catch (error) {
    Alert.alert("Error", "Unable to load bills.");
  }
}

async function deleteBill(id) {
  Alert.alert(
    "Delete Bill",
    "Are you sure you want to delete this bill?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const updatedBills = bills.filter(
            (bill) => bill.id !== id
          );

          await AsyncStorage.setItem(
            "bills",
            JSON.stringify(updatedBills)
          );

          loadBills();
        },
      },
    ]
  );
}

async function generatePDF(bill) {
  Alert.alert(
    "Coming Soon",
    "PDF feature will be added in Part 3."
  );
}

async function sharePDF(bill) {
  Alert.alert(
    "Coming Soon",
    "Share feature will be added in Part 3."
  );
}

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.center}>

        <Text style={styles.title}>
          Nexora History V2
        </Text>

        <Text style={styles.subtitle}>
          Loading...
        </Text>

      </View>

    </SafeAreaView>
  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#94A3B8",
    fontSize: 16,
    marginTop: 10,
  },

});
