import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Text, 
  TextInput, 
  ActivityIndicator, 
  Alert,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { Picker } from '@react-native-picker/picker';


const { width } = Dimensions.get('window');

const Signup = ({ navigation }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_no: "",
    language: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.mobile_no.trim()) newErrors.mobile_no = "Mobile number is required";
    if (!formData.language.trim()) newErrors.language = "Language is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    if (validateForm()) {
      setIsLoading(true);
      // Here you would typically call your signup API
      console.log("Signup data:", formData);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        Alert.alert("Success", "Account created successfully!");
        navigation.navigate('Login');
      }, 1500);
    }
  };

  // crete table name patient_list and feild u upload image 

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient
        colors={['#00ceff', '#0077ff']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>
                <Text style={[styles.curvedLetter, { color: '#333' }]}>C</Text>
                <Text style={[styles.curvedLetter, { color: 'orange' }]}>R</Text>
                <Text style={[styles.curvedLetter, { color: '#333' }]}>M</Text>
                <Text style={[styles.curvedLetter, { color: '#333' }]}> Plus</Text>
              </Text>
              <Text style={styles.subtitle}>Create your account</Text>

              <View style={[styles.inputContainer, errors.first_name && styles.inputError]}>
                <Icon name="user" size={18} color="#777" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  value={formData.first_name}
                  onChangeText={(text) => handleChange('first_name', text)}
                />
              </View>
              {errors.first_name && <Text style={styles.errorText}>{errors.first_name}</Text>}

              <View style={[styles.inputContainer, errors.last_name && styles.inputError]}>
                <Icon name="user" size={18} color="#777" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChangeText={(text) => handleChange('last_name', text)}
                />
              </View>
              {errors.last_name && <Text style={styles.errorText}>{errors.last_name}</Text>}

              <View style={[styles.inputContainer, errors.email && styles.inputError]}>
                <Icon name="envelope" size={18} color="#777" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(text) => handleChange('email', text)}
                />
              </View>
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

              <View style={[styles.inputContainer, errors.mobile_no && styles.inputError]}>
                <Icon name="phone" size={18} color="#777" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Mobile Number"
                  keyboardType="phone-pad"
                  value={formData.mobile_no}
                  onChangeText={(text) => handleChange('mobile_no', text)}
                />
              </View>
              {errors.mobile_no && <Text style={styles.errorText}>{errors.mobile_no}</Text>}

              <View style={[styles.inputContainer, errors.language && styles.inputError]}>
                <Icon name="language" size={18} color="#777" style={styles.inputIcon} />
                <Picker
                    selectedValue={formData.language}
                    onValueChange={(itemValue) => handleChange('language', itemValue)}
                    style={styles.picker}
                    dropdownIconColor="#777"
                >
                    <Picker.Item label="Select language..." value="" />
                    <Picker.Item label="English" value="English" />
                    <Picker.Item label="Urdu" value="Urdu" />
                </Picker>
                </View>
                {errors.language && <Text style={styles.errorText}>{errors.language}</Text>}

              
              <View style={[styles.inputContainer, errors.password && styles.inputError]}>
                <Icon name="lock" size={18} color="#777" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  value={formData.password}
                  onChangeText={(text) => handleChange('password', text)}
                />
                <TouchableOpacity 
                  style={styles.eyeIcon} 
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Icon name={showPassword ? "eye-slash" : "eye"} size={18} color="#777" />
                </TouchableOpacity>
              </View>
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSignup}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginButtonText}>Sign Up</Text>
                )}
              </TouchableOpacity>

              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity 
                style={styles.signupButton}
                onPress={() => navigation.navigate('Main')}
              >
                <Text style={styles.signupButtonText}>Already have an account? Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.69)',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  curvedLetter: {
    transform: [{ rotate: '-10deg' }],
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    height: 50,
    borderWidth: 1,
    borderColor: '#f5f5f5',
  },
  inputError: {
    borderColor: 'red',
  },
  inputIcon: {
    marginRight: 10,
  },

  picker: {
    flex: 1,
    color: '#333',
    marginLeft: -10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 10,
  },
  loginButton: {
    backgroundColor: '#00aaff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#00aaff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 10,
    marginTop:-10,
    marginBottom:-10,
    color: '#9e9e9e',
    fontWeight: '500',
  },
  signupButton: {
    borderWidth: 1,
    borderColor: '#00ceff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: 'rgb(0, 204, 255)',  
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
    marginLeft: 5,
  },
});

export default Signup;