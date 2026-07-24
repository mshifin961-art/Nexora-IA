import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BottomNav() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="home" size={26} color="#3B82F6" />
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons name="receipt-outline" size={26} color="#94A3B8" />
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons name="cube-outline" size={26} color="#94A3B8" />
      </TouchableOpacity>

      <TouchableOpacity>
        <Ionicons name="person-outline" size={26} color="#94A3B8" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#1E293B",
    paddingVertical: 14,
    borderRadius: 18,
    marginTop: 20,
  },
});
