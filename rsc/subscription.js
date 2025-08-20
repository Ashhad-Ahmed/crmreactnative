import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome6';
import { Card } from 'react-native-paper';

const { width } = Dimensions.get('window');
const cardWidth = (width - 45) / 2;

const Subscription = ({ navigation }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePressProfile = () => {
    navigation.navigate('Patient');
  };

  const handleCardPress = (plan) => {
    setSelectedPlan(plan);
    Alert.alert(`Selected Plan`, `You have selected the ${plan} plan`);
  };

  return (
    <View style={styles.container}>
      {/* Compact Header (25 height) */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.bellIconContainer}
          onPress={() => Alert.alert('Bell icon pressed')}
        >
          <Icon name="bell" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.mesgIconContainer}
          onPress={() => Alert.alert('Message icon pressed')}
        >
          <Icon1 name="message" size={20} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.profileContainer}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={styles.profileText}>Arsalan Ahmed</Text>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      {showDropdown && (
        <View style={styles.dropdown}>
          <TouchableOpacity style={styles.dropdownItem} onPress={handlePressProfile}>
            <Text style={styles.dropdownText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>Change Image</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem}>
            <Text style={styles.dropdownText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.pageTitle}>Choose Your Plan</Text>
        
        {/* First Row - Free & Silver */}
        <View style={styles.row}>
          <TouchableOpacity onPress={() => handleCardPress('Free')}>
            <Card style={[styles.card, { width: cardWidth }, selectedPlan === 'Free' && styles.selectedCard]}>
              <Card.Content style={styles.cardContent}>
                <Icon name="star-o" size={30} color="#00aaff" style={styles.cardIcon} />
                <Text style={styles.cardTitle}>FREE</Text>
                <Text style={styles.cardPrice}>Rs 0/=  month</Text> 
                <Text style={styles.cardFeatures}>Basic Features</Text>
                <Text style={styles.cardFeatures}>Limited Access</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => handleCardPress('Silver')}>
            <Card style={[styles.card, { width: cardWidth }, selectedPlan === 'Silver' && styles.selectedCard]}>
              <Card.Content style={styles.cardContent}>
                <Icon name="star-half-o" size={30} color="#00aaff" style={styles.cardIcon} />
                <Text style={styles.cardTitle}>SILVER</Text>
                <Text style={styles.cardPrice}>Rs 500/= month</Text>
                <Text style={styles.cardFeatures}>More Features</Text>
                <Text style={styles.cardFeatures}>Priority Support</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        </View>

        {/* Second Row - Gold */}
        <View style={styles.singleCardRow}>
          <TouchableOpacity onPress={() => handleCardPress('Gold')}>
            <Card style={[styles.card, styles.centerCard, { width: cardWidth * 2 + 15 }, selectedPlan === 'Gold' && styles.selectedCard]}>
              <Card.Content style={styles.cardContent}>
                <Icon name="star" size={40} color="#FFD700" style={styles.cardIcon} />
                <Text style={[styles.cardTitle, { fontSize: 22 }]}>GOLD</Text>
                <Text style={styles.cardPrice}>Rs 1200/= month</Text>
                <Text style={styles.cardFeatures}>All Premium Features</Text>
                <Text style={styles.cardFeatures}>24/7 Support</Text>
                <Text style={styles.cardFeatures}>Exclusive Content</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        </View>

        {/* Subscribe Button */}
        {selectedPlan && (
          <TouchableOpacity 
            style={styles.subscribeButton}
            onPress={() => Alert.alert('Subscription', `Subscribed to ${selectedPlan} plan!`)}
          >
            <Text style={styles.subscribeButtonText}>SUBSCRIBE TO {selectedPlan.toUpperCase()}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#00aaff',
    paddingHorizontal: 10,
  },
  mesgIconContainer: {
    marginRight: 15, 
  },
  bellIconContainer: {
    transform: [{ rotate: '30deg' }], 
    marginRight: 15,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  profileText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  dropdown: {
    position: 'absolute',
    right: 10,
    top: 60,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 1,
    minWidth: 120,
  },
  dropdownItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
  content: {
    padding: 15,
    paddingTop: 20,
    paddingBottom: 30,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  singleCardRow: {
    alignItems: 'center',
    marginBottom: 25,
  },
  // card: {
  //   height: 180,
  //   borderRadius: 10,
  //   backgroundColor: '#fff',
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 4,
  //   elevation: 2,
  //   borderWidth: 1,
  //   borderColor: '#e0e0e0',
  // },
  selectedCard: {
    borderColor: '#00aaff',
    borderWidth: 2,
    backgroundColor: '#f5fbff',
  },
  centerCard: {
    alignSelf: 'center',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIcon: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00aaff',
    marginBottom: 6,
  },
  cardFeatures: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 2,
  },
  subscribeButton: {
    backgroundColor: '#00aaff',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Subscription;