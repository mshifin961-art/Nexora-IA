import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import Share from "react-native-share";

export default function BillScreen() {
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [cart, setCart] = useState([]);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  function addProduct() {
    if (!product || !price || !qty) {
      Alert.alert(
        "Missing Details",
        "Please fill Product, Price and Quantity."
      );
      return;
    }

    setCart([
      ...cart,
      {
        id: Date.now().toString(),
        name: product,
        price: Number(price),
        qty: Number(qty),
      },
    ]);

    setProduct("");
    setPrice("");
    setQty("");
  }

  function removeItem(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  async function saveBill() {
    if (cart.length === 0) {
      Alert.alert(
        "Empty Bill",
        "Add at least one product."
      );
      return;
    }

    try {
      const bill = {
        id: Date.now().toString(),
        customer,
        phone,
        items: cart,
        total,
        date: new Date().toLocaleString(),
      };

      const oldBills =
        JSON.parse(
          await AsyncStorage.getItem("bills")
        ) || [];

      oldBills.unshift(bill);

      await AsyncStorage.setItem(
        "bills",
        JSON.stringify(oldBills)
      );

      Alert.alert(
        "Success",
        "Bill Saved Successfully"
      );

      setCustomer("");
      setPhone("");
      setProduct("");
      setPrice("");
      setQty("");
      setCart([]);
    } catch (e) {
      Alert.alert(
        "Error",
        "Unable to save bill"
      );
    }
  }

  async function generatePDF() {
  try {
    const html = `
      <h1>BillNova AI</h1>
      <h3>Customer: ${customer}</h3>
      <h3>Phone: ${phone}</h3>
      <h3>Total: ₹${total}</h3>
      <p>Date: ${new Date().toLocaleString()}</p>
    `;

    const pdf = await RNHTMLtoPDF.convert({
      html,
      fileName: `Bill_${Date.now()}`,
      directory: "Documents",
    });

    console.log("PDF RESULT:", JSON.stringify(pdf));

    Alert.alert("Debug", JSON.stringify(pdf));

    if (!pdf.filePath) {
      throw new Error("PDF filePath not found");
    }

    await Share.open({
      url: `file://${pdf.filePath}`,
      type: "application/pdf",
    });
  } catch (e) {
    console.log("PDF ERROR:", e);
    Alert.alert("PDF Error", String(e));
  }
  }
    return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        <Text style={styles.title}>🧾 Create Bill</Text>

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
          placeholder="Price"
          keyboardType="numeric"
          placeholderTextColor="#888"
          value={price}
          onChangeText={setPrice}
        />

        <TextInput
          style={styles.input}
          placeholder="Quantity"
          keyboardType="numeric"
          placeholderTextColor="#888"
          value={qty}
          onChangeText={setQty}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={addProduct}
        >
          <Text style={styles.buttonText}>
            Add Product
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>
          Cart Items
        </Text>

        {cart.length === 0 ? (
          <Text style={styles.emptyText}>
            No products added yet.
          </Text>
        ) : (
          cart.map((item) => (
            <View key={item.id} style={styles.cartItem}>

              <View style={styles.itemLeft}>
                <Text style={styles.productName}>
                  {item.name}
                </Text>

                <Text style={styles.productInfo}>
                  ₹{item.price} × {item.qty}
                </Text>
              </View>

              <View style={styles.itemRight}>
                <Text style={styles.productTotal}>
                  ₹{item.price * item.qty}
                </Text>

                <TouchableOpacity
                  onPress={() => removeItem(item.id)}
                >
                  <Text style={styles.removeText}>
                    Remove
                  </Text>
                </TouchableOpacity>

              </View>

            </View>
          ))
        )}

        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>
            Grand Total
          </Text>

          <Text style={styles.totalAmount}>
            ₹{total}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveBill}
        >
          <Text style={styles.buttonText}>
            Save Bill
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.pdfButton}
          onPress={generatePDF}
        >
          <Text style={styles.pdfButtonText}>
            📄 Generate & Share PDF
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
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#1E293B",
    color: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    marginBottom: 12,
  },

  addButton: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  emptyText: {
    color: "#94A3B8",
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
  },

  cartItem: {
    backgroundColor: "#1E293B",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  itemLeft: {
    flex: 1,
  },

  itemRight: {
    alignItems: "flex-end",
  },

  productName: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },

  productInfo: {
    color: "#94A3B8",
    marginTop: 4,
  },

  productTotal: {
    color: "#22C55E",
    fontWeight: "bold",
    fontSize: 18,
  },

  removeText: {
    color: "#EF4444",
    marginTop: 8,
    fontWeight: "bold",
  },

  totalCard: {
    backgroundColor: "#2563EB",
    borderRadius: 16,
    padding: 20,
    marginTop: 15,
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
    padding: 18,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
  },

  pdfButton: {
    backgroundColor: "#E53935",
    borderRadius: 14,
    padding: 18,
    alignItems: "center",
    marginBottom: 40,
  },

  pdfButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
});
