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

    <Text style={styles.title}>
      Bill History
    </Text>

    <View style={styles.searchBox}>

      <Search size={20} color="#94A3B8" />

      <TextInput
        style={styles.searchInput}
        placeholder="Search customer or phone..."
        placeholderTextColor="#94A3B8"
        value={search}
        onChangeText={setSearch}
      />

    </View>

    <View style={styles.summaryRow}>

      <View style={styles.summaryCard}>
        <IndianRupee size={22} color="#22C55E" />
        <Text style={styles.summaryValue}>
          ₹{todaySales}
        </Text>
        <Text style={styles.summaryLabel}>
          Today
        </Text>
      </View>

      <View style={styles.summaryCard}>
        <FileText size={22} color="#3B82F6" />
        <Text style={styles.summaryValue}>
          {totalBills}
        </Text>
        <Text style={styles.summaryLabel}>
          Bills
        </Text>
      </View>

      <View style={styles.summaryCard}>
        <IndianRupee size={22} color="#F59E0B" />
        <Text style={styles.summaryValue}>
          ₹{totalSales}
        </Text>
        <Text style={styles.summaryLabel}>
          Total
        </Text>
      </View>

    </View>

    <ScrollView
      showsVerticalScrollIndicator={false}
    >

      {filteredBills.length === 0 ? (

        <Text style={styles.emptyText}>
          No Bills Found
        </Text>

      ) : (

        filteredBills.map((bill) => (

          <View
            key={bill.id}
            style={styles.billCard}
          >

            <Text style={styles.customer}>
              {bill.customer}
            </Text>

            <Text style={styles.phone}>
              {bill.phone}
            </Text>

            <Text style={styles.date}>
              {bill.date}
            </Text>

            <Text style={styles.total}>
              ₹{bill.total}
            </Text>

            <View style={styles.buttonRow}>

              <TouchableOpacity
                style={styles.pdfButton}
                onPress={() => generatePDF(bill)}
              >
                <FileText size={20} color="#FFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.shareButton}
                onPress={() => sharePDF(bill)}
              >
                <Share2 size={20} color="#FFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => setSelectedBill(bill)}
              >
                <Eye size={20} color="#FFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteBill(bill.id)}
              >
                <Trash2 size={20} color="#FFF" />
              </TouchableOpacity>

            </View>

          </View>

        ))

      )}

    </ScrollView>

  </SafeAreaView>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E293B",
    borderRadius: 16,
    paddingHorizontal: 14,
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 10,
    paddingVertical: 14,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#1E293B",
    marginHorizontal: 4,
    borderRadius: 18,
    padding: 14,
    alignItems: "center",
  },

  summaryValue: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },

  summaryLabel: {
    color: "#94A3B8",
    marginTop: 4,
    fontSize: 13,
  },

  emptyText: {
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 60,
    fontSize: 18,
  },

  billCard: {
    backgroundColor: "#1E293B",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },

  customer: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  phone: {
    color: "#CBD5E1",
    marginTop: 6,
  },

  date: {
    color: "#94A3B8",
    marginTop: 6,
  },

  total: {
    color: "#22C55E",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 14,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  pdfButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  shareButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#22C55E",
    justifyContent: "center",
    alignItems: "center",
  },

  viewButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#7C3AED",
    justifyContent: "center",
    alignItems: "center",
  },

  deleteButton: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
  },
});
