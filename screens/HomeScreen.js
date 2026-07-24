import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";

import StatCard from "../components/StatCard";
import ActionCard from "../components/ActionCard";
import BottomNav from "../components/BottomNav";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Welcome 👋</Text>
            <Text style={styles.shop}>BillNova AI</Text>
          </View>

          <TouchableOpacity>
            <Ionicons
              name="notifications-outline"
              size={28}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        <StatCard
          title="Today's Sales"
          value="₹12,540"
        />

        <TouchableOpacity style={styles.billButton}>
          <Text style={styles.billButtonText}>
            + Create New Bill
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>
          Quick Actions
        </Text>

        <View style={styles.grid}>

          <ActionCard
            icon={
              <Feather
                name="package"
                size={30}
                color="#3B82F6"
              />
            }
            title="Products"
          />

          <ActionCard
            icon={
              <Ionicons
                name="people-outline"
                size={30}
                color="#3B82F6"
              />
            }
            title="Customers"
          />

          <ActionCard
            icon={
              <MaterialIcons
                name="bar-chart"
                size={30}
                color="#3B82F6"
              />
            }
            title="Reports"
          />

          <ActionCard
            icon={
              <Ionicons
                name="sparkles-outline"
                size={30}
                color="#3B82F6"
              />
            }
            title="AI Insights"
          />

        </View>
        <View style={styles.aiCard}>
          <Text style={styles.aiTitle}>🤖 AI Insight</Text>

          <Text style={styles.aiText}>
            Milk stock is running low. Reorder within 2 days to avoid shortage.
          </Text>
        </View>

        <View style={styles.recentCard}>

          <Text style={styles.aiTitle}>
            Recent Bills
          </Text>

          <View style={styles.billRow}>
            <Text style={styles.billName}>INV-1001</Text>
            <Text style={styles.billAmount}>₹450</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billName}>INV-1002</Text>
            <Text style={styles.billAmount}>₹1,250</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billName}>INV-1003</Text>
            <Text style={styles.billAmount}>₹890</Text>
          </View>

        </View>

        <BottomNav />

      </ScrollView>
    </SafeAreaView>
  );
              }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  welcome: {
    color: "#94A3B8",
    fontSize: 16,
  },

  shop: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 4,
  },

  billButton: {
    backgroundColor: "#2563EB",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginVertical: 20,
  },

  billButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  aiCard: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 18,
    marginTop: 20,
  },

  aiTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  aiText: {
    color: "#CBD5E1",
    lineHeight: 22,
  },

  recentCard: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 18,
    marginTop: 20,
    marginBottom: 20,
  },

  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  billName: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  billAmount: {
    color: "#22C55E",
    fontSize: 16,
    fontWeight: "bold",
  },
});


