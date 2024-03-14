import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Linking,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

const Page = () => {
  //
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
  //
  const openLink = () => {
    Linking.openURL('https://www.google.com');
  };
  const sendOTP = async () => {};
  const trySignIn = async () => {};
  //
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.description}>
          Wassap will need to verify your account. Carrier charges may apply.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.gray,
  },
});

export default Page;
