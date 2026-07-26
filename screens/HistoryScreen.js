import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HistoryScreen() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    loadBills();
  }, []);

  async function loadBills() {
    const data = await AsyncStorage.getItem("bills");

    if (data) {
      setBills(JSON.parse(data));
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <Text style={styles.title}>
          Bill History
        </Text>
          {bills.length === 0 ? (
          <Text style={styles.emptyText}>
            No Bills Found
          </Text>
        ) : (
          bills.map((bill) => (
            <View key={bill.id} style={styles.billCard}>

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

  emptyText: {
    color: "#94A3B8",
    fontSize: 18,
    textAlign: "center",
    marginTop: 40,
  },

  billCard: {
    backgroundColor: "#1E293B",
    borderRadius: 14,
    padding: 16,
    marginBottom: 15,
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
  },
});
