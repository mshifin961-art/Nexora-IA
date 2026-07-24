import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.logo}>🏪 BillNova AI</Text>
        <Text style={styles.subtitle}>
          Smarter Billing. Better Business.
        </Text>

        <View style={styles.salesCard}>
          <Text style={styles.salesTitle}>Today's Sales</Text>
          <Text style={styles.salesAmount}>₹12,540</Text>
          <Text style={styles.salesInfo}>24 Bills Generated Today</Text>
        </View>

        <TouchableOpacity style={styles.billButton}>
          <Text style={styles.billText}>+ Create New Bill</Text>
        </TouchableOpacity>

        <Text style={styles.section}>Quick Actions</Text>

        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.icon}>📦</Text>
            <Text style={styles.cardText}>Products</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.icon}>👥</Text>
            <Text style={styles.cardText}>Customers</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.icon}>📊</Text>
            <Text style={styles.cardText}>Reports</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.icon}>🤖</Text>
            <Text style={styles.cardText}>AI Insights</Text>
          </View>
        </View>

        <View style={styles.aiCard}>
          <Text style={styles.aiTitle}>🤖 AI Suggestion</Text>
          <Text style={styles.aiText}>
            Milk stock is getting low. Consider reordering today.
          </Text>
        </View>

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

  logo: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
  },

  subtitle: {
    color: "#94A3B8",
    marginBottom: 20,
  },

  salesCard: {
    backgroundColor: "#1E293B",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },

  salesTitle: {
    color: "#CBD5E1",
    fontSize: 16,
  },

  salesAmount: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    marginVertical: 8,
  },

  salesInfo: {
    color: "#94A3B8",
  },

  billButton: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 25,
  },

  billText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  section: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  card: {
    width: "48%",
    backgroundColor: "#1E293B",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },

  icon: {
    fontSize: 30,
    marginBottom: 10,
  },

  cardText: {
    color: "#fff",
    fontWeight: "bold",
  },

  aiCard: {
    backgroundColor: "#1E293B",
    padding: 18,
    borderRadius: 18,
    marginTop: 10,
    marginBottom: 30,
  },

  aiTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
  },

  aiText: {
    color: "#CBD5E1",
    lineHeight: 22,
  },
});
