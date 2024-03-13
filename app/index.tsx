import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import welcomeImage from '@/assets/images/welcome.png';
import Colors from '@/constants/Colors';

//
const welcome_image = Image.resolveAssetSource(welcomeImage).uri;

const Page = () => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: welcome_image }} style={styles.welcome} />
      <Text style={styles.headline}>Welcome to WhatsApp clone.</Text>
      <Text style={styles.description}>
        Read our{' '}
        <Text style={styles.link} onPress={() => {}}>
          Privacy Policy
        </Text>
        . {'Tap "Agree and continue" to accept the '}
        <Text style={styles.link} onPress={() => {}}>
          Terms of Service
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    width: '100%',
    height: 300,
    marginBottom: 80,
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  description: {},
  link: {
    color: Colors.gray,
  },
});

export default Page;
