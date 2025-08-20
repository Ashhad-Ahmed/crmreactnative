import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function Pediatrics({ route }) {
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (comment.trim().length === 0) {
      alert('Please enter your feedback before submitting');
      return;
    }
    setIsSubmitted(true);
    // Here you would typically send the comment to your backend
  };

  const handleReset = () => {
    setComment('');
    setIsSubmitted(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Feedback</Text>
        <Text style={styles.subHeaderText}>Share your thoughts with us</Text>
      </View>

      <View style={styles.contentContainer}>
        {!isSubmitted ? (
          <View style={styles.formContainer}>
            <Text style={styles.label}>Your Feedback</Text>
            <TextInput
              style={styles.commentInput}
              multiline
              numberOfLines={6}
              placeholder="Write your feedback here (max 1000 characters)..."
              value={comment}
              onChangeText={(text) => {
                if (text.length <= 1000) {
                  setComment(text);
                }
              }}
              maxLength={1000}
            />
            <Text style={styles.charCounter}>
              {comment.length}/1000 characters
            </Text>

            <TouchableOpacity 
              style={styles.submitButton} 
              onPress={handleSubmit}
              disabled={comment.trim().length === 0}
            >
              <Text style={styles.submitButtonText}>
                Submit Feedback
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Thank You!</Text>
            <Text style={styles.resultText}>
              We appreciate your feedback. Your comments help us improve our service.
            </Text>
            
            <TouchableOpacity 
              style={styles.submitAnotherButton} 
              onPress={handleReset}
            >
              <Text style={styles.submitButtonText}>
                Submit Another Feedback
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  commentInput: {
    backgroundColor: '#f5f7fa',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 150,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  charCounter: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  submitAnotherButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  resultContainer: {
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
  resultTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007bff',
    marginBottom: 15,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
  },
});