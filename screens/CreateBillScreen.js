import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function BillScreen() {
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");

  const total =
    (parseFloat(price) || 0) * (parseInt(qty) || 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <Text style={styles.title}>🧾 Create New Bill</Text>

        <TextInput
          style={styles.input}
          placeholder="Customer Name"
          placeholderTextColor="#888"
          value={customer}
          onChangeText={setCustomer}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <TextInput
          style={styles.input}
          placeholder="Product Name"
          placeholderTextColor="#888"
          value={product}
          onChangeText={setProduct}
        />

        <TextInput
          style={styles.input}
          placeholder="Price (₹)"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        <TextInput
          style={styles.input}
          placeholder="Quantity"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={qty}
          onChangeText={setQty}
        />
                    <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>Grand Total</Text>
          <Text style={styles.totalAmount}>₹{total}</Text>
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 25,
  },

  input: {
    backgroundColor: "#1E293B",
    color: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 15,
  },

  totalCard: {
    backgroundColor: "#1D4ED8",
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  totalAmount: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },

  saveButton: {
    backgroundColor: "#22C55E",
    borderRadius: 14,
    padding: 16,
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
