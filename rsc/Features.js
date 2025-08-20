import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const options = [
  { id: '1', title: 'Set Notification Reminder', screen: 'NotificationReminder' },
  { id: '2', title: 'BMI Checkup', screen: 'BmiCheckup' },
  { id: '3', title: 'Pediatrics', screen: 'Pediatrics' },
  { id: '4', title: 'Drug Interaction Checkup', screen: 'DrugInteractionCheckup' },
];

const OptionCard = ({ title, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.cardContent}>
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>✓</Text>
      </View>
      <Text style={styles.cardText}>{title}</Text>
    </View>
  </TouchableOpacity>
);

export default function Features({ navigation }) {
  const handleOptionPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Select an Option</Text>
        <Text style={styles.subHeaderText}>Choose a service to proceed</Text>
      </View>

      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <OptionCard
            key={option.id}
            title={option.title}
            onPress={() => handleOptionPress(option.screen)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },

  // Header
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

  // Options Container
  optionsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },

  // Individual Cards
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#007bff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});