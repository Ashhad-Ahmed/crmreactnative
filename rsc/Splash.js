import { View, Text, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
//import { FontAwesome } from '@expo/vector-icons';

const Splash = () => {
  const navigation = useNavigation();
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [loadingAnimation, setLoadingAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(loadingAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(loadingAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    const timer = setTimeout(() => {
      navigation.navigate('Main');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.gradientContainer}>
        <View style={styles.gradient} />
      </View>
      <View style={styles.waveformContainer}>
        {Array(20)
         .fill(0)
         .map((_, index) => (
            <Animated.View
              key={index}
              style={[
                styles.circle,
                {
                  transform: [
                    {
                      translateX: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [index * 10, (index + 1) * 10],
                      }),
                    },
                  ],
                },
              ]}
            />
          ))}
      </View>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: animation,
          },
        ]}
      >
        <Text style={styles.logoText}>Your App Name</Text>
      </Animated.View>
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
        <Animated.View
          style={[
            styles.loadingIcon,
            {
              transform: [
                {
                  rotate: loadingAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
        >
          {/* <FontAwesome name="circle-o-notch" size={24} color="#FFFFFF" /> */}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gradient: {
    flex: 1,
    backgroundColor: 'rgba(0, 122, 255, 0.5)', // deep blue
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
  },
  waveformContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#FFFFFF', // white
    marginHorizontal: 2,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF', // white
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});

export default Splash;