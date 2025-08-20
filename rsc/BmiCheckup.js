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

export default function BmiCheckup() {
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [showResult, setShowResult] = useState(false);

  const calculateBMI = () => {
    if (!feet || !inches || !weight) {
      alert('Please enter all required fields');
      return;
    }

    const feetNum = parseInt(feet);
    const inchesNum = parseInt(inches);
    const weightNum = parseFloat(weight);

    if (isNaN(feetNum) || isNaN(inchesNum) || isNaN(weightNum)) {
      alert('Please enter valid numeric values');
      return;
    }

    const heightInInches = feetNum * 12 + inchesNum;
    if (heightInInches === 0) {
      alert('Height must be greater than zero');
      return;
    }
    const heightInMeters = heightInInches * 0.0254;
    const weightInKg = weightNum * 0.453592;

    const bmiValue = weightInKg / (heightInMeters * heightInMeters);
    const roundedBmi = Number(bmiValue.toFixed(1));
    setBmi(roundedBmi);

    if (roundedBmi < 18.5) {
      setBmiCategory('Underweight');
    } else if (roundedBmi >= 18.5 && roundedBmi < 25) {
      setBmiCategory('Normal weight');
    } else if (roundedBmi >= 25 && roundedBmi < 30) {
      setBmiCategory('Overweight');
    } else {
      setBmiCategory('Obese');
    }

    setShowResult(true);
  };

  const doneHandler = () => {
    setShowResult(false);
    // Optional: Reset inputs and results
    // setFeet('');
    // setInches('');
    // setWeight('');
    // setBmi(null);
    // setBmiCategory('');
  };

  const getBmiColor = () => {
    if (bmi === null) return '#007bff';
    if (bmi < 18.5) return '#3498db'; // Blue for underweight
    if (bmi >= 18.5 && bmi < 25) return '#2ecc71'; // Green for normal
    if (bmi >= 25 && bmi < 30) return '#f39c12'; // Orange for overweight
    return '#e74c3c'; // Red for obese
  };

  const getBmiAngle = () => {
    if (bmi === null) return -135;
    const clampedBmi = Math.min(Math.max(bmi, 10), 40);
    return ((clampedBmi - 10) / 30) * 270 - 135;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f7fa" />
      <View style={styles.header}>
        <Text style={styles.headerText}>BMI Calculator</Text>
        <Text style={styles.subHeaderText}>Check your body mass index</Text>
      </View>

      <View style={styles.contentContainer}>
        {!showResult ? (
          <View style={styles.formContainer}>
            <View style={styles.inputRow}>
              <Text style={styles.label}>Height</Text>
              <View style={styles.heightContainer}>
                <TextInput
                  style={[styles.input, styles.heightInput]}
                  keyboardType="numeric"
                  placeholder="Feet"
                  value={feet}
                  onChangeText={setFeet}
                />
                <Text style={styles.unitText}>ft</Text>
                <TextInput
                  style={[styles.input, styles.heightInput]}
                  keyboardType="numeric"
                  placeholder="Inches"
                  value={inches}
                  onChangeText={setInches}
                />
                <Text style={styles.unitText}>in</Text>
              </View>
            </View>

            <View style={styles.inputRow}>
              <Text style={styles.label}>Weight</Text>
              <View style={styles.weightContainer}>
                <TextInput
                  style={[styles.input, styles.weightInput]}
                  keyboardType="numeric"
                  placeholder="Pounds"
                  value={weight}
                  onChangeText={setWeight}
                />
                <Text style={styles.unitText}>pounds</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.calculateButton} onPress={calculateBMI}>
              <Text style={styles.calculateButtonText}>Calculate BMI</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Your BMI Result</Text>

            <View style={styles.speedometerContainer}>
              <View style={styles.speedometer}>
                <View
                  style={[
                    styles.speedometerArc,
                    { transform: [{ rotate: '-135deg' }], borderTopColor: '#3498db' },
                  ]}
                />
                <View
                  style={[
                    styles.speedometerArc,
                    { transform: [{ rotate: '-45deg' }], borderTopColor: '#2ecc71' },
                  ]}
                />
                <View
                  style={[
                    styles.speedometerArc,
                    { transform: [{ rotate: '45deg' }], borderTopColor: '#f39c12' },
                  ]}
                />
                <View
                  style={[
                    styles.speedometerArc,
                    { transform: [{ rotate: '135deg' }], borderTopColor: '#e74c3c' },
                  ]}
                />

                <View
                  style={[
                    styles.needle,
                    {
                      transform: [{ rotate: `${getBmiAngle()}deg` }],
                      backgroundColor: getBmiColor(),
                    },
                  ]}
                />

                <View style={styles.centerCircle} />
              </View>

              <View style={styles.bmiValueContainer}>
                <Text style={[styles.bmiValue, { color: getBmiColor() }]}>{bmi}</Text>
                <Text style={styles.bmiCategory}>{bmiCategory}</Text>
              </View>
            </View>

            <View style={styles.categoriesContainer}>
              <View style={styles.category}>
                <View style={[styles.categoryIndicator, { backgroundColor: '#3498db' }]} />
                <Text style={styles.categoryText}>Underweight (&lt;18.5)</Text>
              </View>
              <View style={styles.category}>
                <View style={[styles.categoryIndicator, { backgroundColor: '#2ecc71' }]} />
                <Text style={styles.categoryText}>Normal (18.5-24.9)</Text>
              </View>
              <View style={styles.category}>
                <View style={[styles.categoryIndicator, { backgroundColor: '#f39c12' }]} />
                <Text style={styles.categoryText}>Overweight (25-29.9)</Text>
              </View>
              <View style={styles.category}>
                <View style={[styles.categoryIndicator, { backgroundColor: '#e74c3c' }]} />
                <Text style={styles.categoryText}>Obese (30+)</Text>
              </View>
            </View>

            <TouchableOpacity style={[styles.calculateButton, { marginTop: 20 }]} onPress={doneHandler}>
              <Text style={styles.calculateButtonText}>Done</Text>
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
  inputRow: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f7fa',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  heightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heightInput: {
    flex: 1,
    marginRight: 5,
  },
  weightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weightInput: {
    flex: 1,
    marginRight: 5,
  },
  unitText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginLeft: 5,
    marginRight: 10,
  },
  calculateButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  resultContainer: {
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
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  speedometerContainer: {
    position: 'relative',
    width: 250,
    height: 150,
    marginBottom: 30,
  },
  speedometer: {
    width: 250,
    height: 125,
    overflow: 'hidden',
    position: 'relative',
  },
  speedometerArc: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: '#ccc', // default color, overridden inline
  },
  needle: {
    position: 'absolute',
    left: '50%',
    bottom: 0,
    width: 3,
    height: 100,
    borderRadius: 3,
    marginLeft: -1.5,
  },
  centerCircle: {
    position: 'absolute',
    left: '50%',
    bottom: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#333',
    marginLeft: -10,
    marginBottom: -10,
    zIndex: 20,
  },
  bmiValueContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bmiValue: {
    fontSize: 36,
    fontWeight: '800',
    color: '#007bff',
  },
  bmiCategory: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 5,
  },
  categoriesContainer: {
    width: '100%',
    marginTop: 20,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
});