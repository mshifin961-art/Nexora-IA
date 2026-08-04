import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import {
  Search,
  FileText,
  Share2,
  Trash2,
} from "lucide-react-native";

export default function HistoryScreen() {

  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadBills();
  }, []);

  async function loadBills() {
    try {
      const data = await AsyncStorage.getItem("bills");

      if (data) {
        setBills(JSON.parse(data));
      } else {
        setBills([]);
      }

    } catch (e) {
      Alert.alert("Error", "Unable to load bills");
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

          setBills(updatedBills);

          await AsyncStorage.setItem(
            "bills",
            JSON.stringify(updatedBills)
          );
        },
      },
    ]
  );
}

async function generatePDF(bill) {
  try {

    let itemsHTML = "";

    bill.items.forEach((item) => {
      itemsHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>₹${item.price}</td>
        <td>₹${item.qty * item.price}</td>
      </tr>
      `;
    });

    const html = `
    <html>
    <body>

      <h1>Nexora AI Invoice</h1>

      <h3>Customer : ${bill.customer}</h3>
      <h3>Phone : ${bill.phone}</h3>

      <p>Date : ${bill.date}</p>

      <table border="1" cellspacing="0" cellpadding="8" width="100%">
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>

        ${itemsHTML}

      </table>

      <h2>Total : ₹${bill.total}</h2>

    </body>
    </html>
    `;

    const pdf = await Print.printToFileAsync({
      html,
    });

    return pdf.uri;

  } catch (e) {
    Alert.alert("Error", "Unable to generate PDF");
    return null;
  }
}

async function sharePDF(bill) {

  const uri = await generatePDF(bill);

  if (!uri) return;

  await Sharing.shareAsync(uri);

}

const filteredBills = bills.filter((bill) => {

  const customer =
    (bill.customer || "").toLowerCase();

  const phone =
    (bill.phone || "").toLowerCase();

  return (
    customer.includes(search.toLowerCase()) ||
    phone.includes(search.toLowerCase())
  );

});
  return (
  <SafeAreaView style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>

      <Text style={styles.title}>
        Bill History
      </Text>

      <View style={styles.searchBox}>

        <Search size={20} color="#94A3B8" />

        <TextInput
          style={styles.searchInput}
          placeholder="Search customer..."
          placeholderTextColor="#94A3B8"
          value={search}
          onChangeText={setSearch}
        />

      </View>

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
              👤 {bill.customer}
            </Text>

            <Text style={styles.phone}>
              📞 {bill.phone}
            </Text>

            <Text style={styles.date}>
              📅 {bill.date}
            </Text>

            <Text style={styles.total}>
              ₹{bill.total}
            </Text>

            <View style={styles.buttonRow}>

              <TouchableOpacity
                style={styles.pdfButton}
                onPress={() => generatePDF(bill)}
              >
                <FileText size={20} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.shareButton}
                onPress={() => sharePDF(bill)}
              >
                <Share2 size={20} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteBill(bill.id)}
              >
                <Trash2 size={20} color="#FFFFFF" />
              </TouchableOpacity>

            </View>

          </View>

        ))

      )}

    </ScrollView>
  </SafeAreaView>
);
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
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    paddingVertical: 14,
    marginLeft: 10,
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
    marginBottom: 6,
  },

  phone: {
    color: "#CBD5E1",
    fontSize: 15,
    marginBottom: 6,
  },

  date: {
    color: "#94A3B8",
    fontSize: 14,
    marginBottom: 6,
  },

  total: {
    color: "#22C55E",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 14,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  pdfButton: {
    width: 56,
    height: 56,
    backgroundColor: "#2563EB",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  shareButton: {
    width: 56,
    height: 56,
    backgroundColor: "#22C55E",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteButton: {
    width: 56,
    height: 56,
    backgroundColor: "#DC2626",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
