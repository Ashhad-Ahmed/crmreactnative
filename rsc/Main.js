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
  Platform
} from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');



const Main = ({ navigation }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    let isValid = true;


    setEmailError('');
    setPasswordError('');


    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);

    try {
      const response = await fetch("http://16.171.147.166:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        Alert.alert("Success", "Login successful!");
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", result.message || "Login failed");
      }
    } catch (error) {
      console.error("Full error:", error);
      Alert.alert("Error", "Cannot connect to server. Check ngrok URL and internet.");
    } finally {
      setIsLoading(false);
    }
  };

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
        <View style={styles.content}>
          {/* <LottieView
            source={require('../assets/loading.json')}
            autoPlay
            loop
            style={styles.animation}
          /> */}

          <View style={styles.formContainer}>
          <Text style={styles.title}>
  <Text style={[styles.curvedLetter, { color: '#333' }]}>C</Text>
  <Text style={[styles.curvedLetter, { color: 'orange' }]}>R</Text>
  <Text style={[styles.curvedLetter, { color: '#333' }]}>M</Text>
  <Text style={[styles.curvedLetter, { color: '#333' }]}> Plus</Text>
</Text>

            <Text style={styles.subtitle}>Login to your account</Text>
            <View style={{ marginTop: 10 }}>
            <View style={[styles.inputContainer, emailError ? styles.inputError : null]}>
              <Icon name="envelope" size={18} color="#666" style={styles.inputIcon} />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <View style={[styles.inputContainer, passwordError ? styles.inputError : null]}>
              <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                style={styles.input}
              />
      
      
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Icon 
                  name={showPassword ? 'eye-slash' : 'eye'} 
                  size={18} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>
            </View>
      
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => navigation.navigate('Signup')}
            >
              <Text style={styles.signupButtonText}>Create Account</Text>
            </TouchableOpacity>

            <View style={styles.socialLoginContainer}>
              <Text style={styles.socialLoginText}></Text>
              {/* <View style={styles.socialIcons}>
                <TouchableOpacity style={styles.socialIcon}>
                  <Icon name="google" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                  <Icon name="facebook" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                  <Icon name="apple" size={24} color="#fff" />
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
  },
  animation: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginBottom: 10,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.69)',
    // backgroundColor: '#00aaff',
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
  curvedC: {
    transform: [{ rotate: '-10deg' }], 
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  curvedR: {
    transform: [{ rotate: '-10deg' }], 
    color: 'orange',
    fontSize: 28,
    fontWeight: 'bold',
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
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333',
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#777',
    fontWeight: '500',
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
    marginTop:-10,
    marginBottom: -10,
    marginHorizontal: 10,
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
  socialLoginContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  socialLoginText: {
    marginBottom: 15,
    color: '#666',
    fontWeight: '500',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    marginHorizontal: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 14,
    marginLeft: 5,
  },
});

export default Main;