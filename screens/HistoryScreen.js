import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
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

  async function loadBills() {
    // Part 2
  }

  async function deleteBill(id) {
    // Part 2
  }

  async function generatePDF(bill) {
    // Part 3
  }

  async function sharePDF(bill) {
    // Part 3
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.loadingText}>
        Nexora History Loading...
      </Text>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

});
