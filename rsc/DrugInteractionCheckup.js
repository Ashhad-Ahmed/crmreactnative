import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Linking,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function DrugInteractionCheckup({ route }) {

  const handlePress = () => {
    Linking.openURL('https://www.google.com').catch(err => {
      console.error("Failed to open URL:", err);
      alert('Failed to open the drug interaction checker');
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Health Tools</Text>
        <Text style={styles.subHeaderText}>Check for drug interactions</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Drug Interaction Checker</Text>
          <Text style={styles.cardDescription}>
            Check potential interactions between medications, herbs, and supplements.
          </Text>
          
          <TouchableOpacity 
            style={styles.checkButton} 
            onPress={handlePress}
          >
            <Text style={styles.checkButtonText}>Open Drug Interaction Checker</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: '#007bff',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#e0e0e0',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#007bff',
    marginBottom: 15,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 24,
  },
  checkButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    alignItems: 'center',
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});