import React, { useEffect, useRef, useState } from 'react';
import { 
  Animated,
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  Image,
  Dimensions,
  StatusBar,
  Modal,
  TextInput,
} from 'react-native';

const { width } = Dimensions.get('window');

const DATA = [
  {
    id: '1',
    name: 'Hamza Ahmed',
    gender: 'Male',
    meds: 'Disprine, Panadol, Cafflam',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    height: '175 cm',
    weight: '70 kg',
    allergies: 'None',
    comments: 'No additional comments',
  },
  {
    id: '2',
    name: 'Hamza Ahmed',
    gender: 'Male',
    meds: 'Disprine, Panadol, Cafflam',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    height: '175 cm',
    weight: '70 kg',
    allergies: 'None',
    comments: 'No additional comments',
  },
];

const AnimatedCard = ({item, fadeAnim, onPress}) => {
  return (
    <Animated.View style={[styles.card, {opacity: fadeAnim}]}>
      <TouchableOpacity onPress={() => onPress(item)} activeOpacity={0.8} style={{flexDirection: 'row', flex: 1}}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.profileImage} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.infoText}>Gender: {item.gender}</Text>
          <Text style={styles.infoText}>Current Med: {item.meds}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function App() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const onPressButton = () => {
    console.log('Blue button pressed!');
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />
      <View style={styles.header}>
        <TouchableOpacity onPress={onPressButton} style={styles.button}>
          <Text style={styles.buttonText}>ADD NEW </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20 }}
        renderItem={({ item }) => <AnimatedCard item={item} fadeAnim={fadeAnim} onPress={openModal} />}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      />

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={styles.modalContainer}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>

            {selectedUser && (
              <>
                <View style={styles.modalImageContainer}>
                  <Image source={{ uri: selectedUser.image }} style={styles.modalProfileImage} />
                  <TouchableOpacity style={styles.changeIcon} activeOpacity={0.7} onPress={() => alert('Change icon pressed')}>
                    <Text style={styles.changeIconText}>+</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.modalInfo}>
                  <Text style={styles.modalName}>{selectedUser.name}</Text>
                  <Text style={styles.modalInfoText}>Gender: {selectedUser.gender}</Text>
                  <Text style={styles.modalInfoText}>Current Med: {selectedUser.meds}</Text>
                  
                  <View style={styles.divider} />

                  <Text style={styles.modalLabel}>Height</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={selectedUser.height}
                    editable={false}
                    selectTextOnFocus={false}
                  />

                  <Text style={styles.modalLabel}>Weight</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={selectedUser.weight}
                    editable={false}
                    selectTextOnFocus={false}
                  />

                  <Text style={styles.modalLabel}>Allergies</Text>
                  <TextInput
                    style={styles.modalInput}
                    value={selectedUser.allergies}
                    editable={false}
                    selectTextOnFocus={false}
                    multiline
                  />

                  <Text style={styles.modalLabel}>Comments</Text>
                  <TextInput
                    style={[styles.modalInput, {height: 60}]}
                    value={selectedUser.comments}
                    editable={false}
                    selectTextOnFocus={false}
                    multiline
                  />
                </View>
              </>
            )}
          </Animated.View>
        </View>
      </Modal>
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
    paddingTop: 40,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#f5f7fa',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#007bff',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 28,
    color: '#888',
    fontWeight: '700',
  },
  modalImageContainer: {
    alignSelf: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  modalProfileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#007bff',
  },
  changeIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007bff',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  changeIconText: {
    color: 'white',
    fontSize: 22,
    lineHeight: 22,
    fontWeight: '700',
  },
  modalInfo: {
    width: '100%',
  },
  modalName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#222',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalInfoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 15,
  },
  modalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 4,
  },
  modalInput: {
    backgroundColor: '#f0f3f7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    color: '#333',
    marginBottom: 15,
  },
});
