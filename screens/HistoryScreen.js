import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import {
  Search,
  UserRound,
  Phone,
  CalendarDays,
  IndianRupee,
  FileText,
  Share2,
  Trash2,
  Eye,
} from "lucide-react-native";

export default function HistoryScreen() {

  const [bills, setBills] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBill, setSelectedBill] = useState(null);
  const [todaySales, setTodaySales] = useState(0);

const [totalSales, setTotalSales] = useState(0);

const [totalBills, setTotalBills] = useState(0);


  useEffect(() => {
    loadBills();
  }, []);

  async function loadBills() {
    try {
      const data = await AsyncStorage.getItem("bills");

      if (data) {
  const parsed = JSON.parse(data);

  setBills(parsed);

  const today = new Date().toLocaleDateString();

  let total = 0;
  let todayTotal = 0;

  parsed.forEach((bill) => {
    total += Number(bill.total || 0);

    if (bill.date === today) {
      todayTotal += Number(bill.total || 0);
    }
  });

  setTotalBills(parsed.length);
  setTotalSales(total);
  setTodaySales(todayTotal);

} else {
  setBills([]);
  setTotalBills(0);
  setTotalSales(0);
  setTodaySales(0);
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
            <td>₹${item.price * item.qty}</td>
          </tr>
        `;
      });

      const html = `
      <html>
      <body>

      <h1>Nexora AI</h1>

      <h3>Customer : ${bill.customer}</h3>

      <h3>Phone : ${bill.phone}</h3>

      <p>Date : ${bill.date}</p>

      <table border="1"
      cellspacing="0"
      cellpadding="8"
      width="100%">

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
      Alert.alert(
        "Error",
        "Unable to generate PDF"
      );
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
      <View style={styles.summaryRow}>

  <View style={styles.summaryCard}>
    <Text style={styles.summaryTitle}>
      Bills
    </Text>

    <Text style={styles.summaryValue}>
      {totalBills}
    </Text>
  </View>

  <View style={styles.summaryCard}>
    <Text style={styles.summaryTitle}>
      Today
    </Text>

    <Text style={styles.summaryValue}>
      ₹{todaySales}
    </Text>
  </View>

  <View style={styles.summaryCard}>
    <Text style={styles.summaryTitle}>
      Total
    </Text>

    <Text style={styles.summaryValue}>
      ₹{totalSales}
    </Text>
  </View>

</View>
      

        <View style={styles.searchContainer}>

  <Search
    size={20}
    color="#94A3B8"
  />

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
  style={[
    styles.billCard,
    {
      borderWidth: 1,
      borderColor: "#334155",
      shadowColor: "#000",
      shadowOpacity: 0.25,
      shadowRadius: 12,
      shadowOffset: {
        width: 0,
        height: 6,
      },
      elevation: 8,
    },
  ]}
>

              <Text style={styles.customer}>
                👤 {bill.customer || "Unknown Customer"}
              </Text>

              <Text style={styles.phone}>
                📞 {bill.phone || "-"}
              </Text>

              <Text style={styles.total}>
                💰 ₹{bill.total}
              </Text>

              <Text style={styles.date}>
                📅 {bill.date}
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

              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteBill(bill.id)}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
  <Trash2 size={18} color="#FFFFFF" />
  <Text style={[styles.deleteText, { marginLeft: 8 }]}>
    Delete Bill
  </Text>
</View>
              </TouchableOpacity>

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

  searchContainer: {
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
    marginTop: 40,
    fontSize: 18,
  },

  billCard: {
  backgroundColor: "#1E293B",
  borderRadius: 20,
  padding: 20,
  marginBottom: 18,
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

  total: {
    color: "#22C55E",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },

  date: {
    color: "#94A3B8",
    fontSize: 14,
    marginBottom: 14,
  },
  summaryRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 20,
},

summaryCard: {
  flex: 1,
  backgroundColor: "#1E293B",
  borderRadius: 16,
  paddingVertical: 16,
  alignItems: "center",
  marginHorizontal: 4,
},

summaryTitle: {
  color: "#94A3B8",
  fontSize: 13,
  marginBottom: 6,
},

summaryValue: {
  color: "#FFFFFF",
  fontSize: 20,
  fontWeight: "bold",
},

  buttonRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 14,
  marginBottom: 14,
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
  
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  deleteButton: {
  backgroundColor: "#DC2626",
  borderRadius: 16,
  paddingVertical: 14,
  alignItems: "center",
},

  deleteText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
