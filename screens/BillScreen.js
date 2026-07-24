import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function CreateBillScreen() {
  return (
    <SafeAreaView style={styles.container}>

      <ScrollView>

        <Text style={styles.title}>
          Create New Bill
        </Text>

        <Text style={styles.label}>
          Customer Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter customer name"
          placeholderTextColor="#94A3B8"
        />

        <Text style={styles.label}>
          Product Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter product"
          placeholderTextColor="#94A3B8"
        />

        <Text style={styles.label}>
          Quantity
        </Text>

        <TextInput
          style={styles.input}
          placeholder="1"
          keyboardType="numeric"
          placeholderTextColor="#94A3B8"
        />

        <Text style={styles.label}>
          Price
        </Text>

        <TextInput
          style={styles.input}
          placeholder="₹0"
          keyboardType="numeric"
          placeholderTextColor="#94A3B8"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Add Product
          </Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>
          Products Added
        </Text>

        <View style={styles.productCard}>
          <View style={styles.productRow}>
            <Text style={styles.productName}>Milk</Text>
            <Text style={styles.productPrice}>₹60</Text>
          </View>

          <View style={styles.productRow}>
            <Text style={styles.productName}>Bread</Text>
            <Text style={styles.productPrice}>₹40</Text>
          </View>

          <View style={styles.productRow}>
            <Text style={styles.productName}>Eggs</Text>
            <Text style={styles.productPrice}>₹120</Text>
          </View>
        </View>

        <View style={styles.totalCard}>
          <Text style={styles.totalText}>
            Total
          </Text>

          <Text style={styles.totalAmount}>
            ₹220
          </Text>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>
            Save Bill
          </Text>
        </TouchableOpacity>

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
    marginBottom: 25,
  },

  label: {
    color: "#CBD5E1",
    fontSize: 15,
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    backgroundColor: "#1E293B",
    color: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#2563EB",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 25,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 17,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
  },

  productCard: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 18,
  },

  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  productName: {
    color: "#FFFFFF",
    fontSize: 17,
  },

  productPrice: {
    color: "#22C55E",
    fontWeight: "bold",
    fontSize: 17,
  },

  totalCard: {
    backgroundColor: "#2563EB",
    borderRadius: 16,
    padding: 18,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  totalText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  totalAmount: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },

  saveButton: {
    backgroundColor: "#22C55E",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    marginTop: 25,
    marginBottom: 40,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
