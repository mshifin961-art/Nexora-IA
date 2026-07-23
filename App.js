import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>🏪 BillNova AI</Text>
        <Text style={styles.subtitle}>Smarter Billing. Better Business.</Text>

        <View style={styles.salesCard}>
          <Text style={styles.cardTitle}>Today's Sales</Text>
          <Text style={styles.amount}>₹12,540</Text>
          <Text style={styles.smallText}>24 Bills Today</Text>
        </View>

        <TouchableOpacity style={styles.billButton}>
          <Text style={styles.billButtonText}>+ Create New Bill</Text>
        </TouchableOpacity>

        <Text style={styles.section}>Quick Actions</Text>

        <View style={styles.grid}>
          <View style={styles.box}>
            <Text style={styles.icon}>📦</Text>
            <Text style={styles.boxText}>Products</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.icon}>👥</Text>
            <Text style={styles.boxText}>Customers</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.icon}>📊</Text>
            <Text style={styles.boxText}>Reports</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.icon}>🤖</Text>
            <Text style={styles.boxText}>AI Insights</Text>
          </View>
        </View>

        <View style={styles.aiCard}>
          <Text style={styles.aiTitle}>🤖 AI Insight</Text>
          <Text style={styles.aiText}>
            Your top-selling product today is Rice.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    color: '#94A3B8',
    marginBottom: 25,
  },
  salesCard: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
  },
  cardTitle: {
    color: '#94A3B8',
    fontSize: 16,
  },
  amount: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  smallText: {
    color: '#CBD5E1',
  },
  billButton: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 25,
  },
  billButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  box: {
    width: '48%',
    backgroundColor: '#1E293B',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    fontSize: 32,
    marginBottom: 10,
  },
  boxText: {
    color: '#fff',
    fontWeight: '600',
  },
  aiCard: {
    backgroundColor: '#1E293B',
    padding: 18,
    borderRadius: 18,
    marginTop: 10,
    marginBottom: 30,
  },
  aiTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  aiText: {
    color: '#CBD5E1',
    lineHeight: 22,
  },
});
