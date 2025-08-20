import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, ScrollView, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome6';
import { Card } from 'react-native-paper';

const { width } = Dimensions.get('window');
const cardWidth = (width - 45) / 2;

const Home = ({ navigation }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  

  const handlePressProfile = (cardTitle) => {
    navigation.navigate('Patient');
  };

  const handlePressSubscription = ()=>{
    navigation.navigate('Subscription');
  }


    const handlePressFeatures = ()=>{
    navigation.navigate('Features');
  }

  

    const handlePressClinic = ()=>{
    navigation.navigate('Clinic');
  }

  const handleCardSchedule = ()=>{
    navigation.navigate('Schedule');
  }
  
  

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
          <TouchableOpacity style={styles.dropdownItem}>
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
        {/* First Row */}
        <View style={styles.row}>
          <TouchableOpacity onPress={() => handlePressProfile('Profile')}>
            <Card style={[styles.card, { width: cardWidth }]}>
             
              <Card.Content style={styles.cardContent}>
                <Icon name="user" size={30} color="#00aaff" style={styles.cardIcon} />
                <Text style={styles.cardTitle}>Profile</Text>
                <Text style={styles.cardSubtitle}>View your profile</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => handlePressSubscription('Subscriptions')}>
            <Card style={[styles.card, { width: cardWidth }]}>
              <Card.Content style={styles.cardContent}>
                <Icon name="credit-card" size={30} color="#00aaff" style={styles.cardIcon} />
                <Text style={styles.cardTitle}>Subscriptions</Text>
                <Text style={styles.cardSubtitle}>Manage plans</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        </View>

        {/* Second Row */}
        <View style={styles.row}>
          <TouchableOpacity onPress={() => handlePressFeatures('Features')}>
            <Card style={[styles.card, { width: cardWidth }]}>
              <Card.Content style={styles.cardContent}>
                <Icon name="star" size={30} color="#00aaff" style={styles.cardIcon} />
                <Text style={styles.cardTitle}>Features</Text>
                <Text style={styles.cardSubtitle}>Explore features</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => handlePressClinic('Clinic')}>
            <Card style={[styles.card, { width: cardWidth }]}>
              <Card.Content style={styles.cardContent}>
                <Icon name="hospital-o" size={30} color="#00aaff" style={styles.cardIcon} />
                <Text style={styles.cardTitle}>Clinical Updates</Text>
                <Text style={styles.cardSubtitle}>Updates About Clinic</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        </View>

        {/* Single Card Row */}
        <View>
          <TouchableOpacity onPress={() => handleCardSchedule('Schedule')}>
            <Card style={[styles.card, styles.centerCard, { width: cardWidth * 2 + 15 }]}>
              <Card.Content style={styles.cardContent}>
                <Icon name="calendar" size={40} color="#00aaff" style={styles.cardIcon} />
                <Text style={[styles.cardTitle, { fontSize: 22 }]}>Schedule</Text>
                <Text style={styles.cardSubtitle}>View your appointments</Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        </View>
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
   marginTop: '7%',
    padding: 15,
    paddingTop: 20,
    paddingBottom: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  singleCardRow: {
    alignItems: 'center',
    marginBottom: 15,
  },
  card: {
    height: 150, // Increased height to accommodate more content
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flex: 1,                 // Take full screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     
    elevation: 2,
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
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default Home;