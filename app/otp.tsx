import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Linking,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaskInput from 'react-native-mask-input';

const Page = () => {
  //
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const { bottom } = useSafeAreaInsets();
  const router = useRouter();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
  const GER_PHONE = [
    `+`,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
  //
  const openLink = () => {
    Linking.openURL('https://www.google.com');
  };
  const sendOTP = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(`/verify/${phoneNumber}`);
    }, 1000);
  };
  const trySignIn = async () => {};
  //
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding'>
      <View style={styles.container}>
        {loading && (
          <View style={[StyleSheet.absoluteFill, styles.loading]}>
            <ActivityIndicator size='large' color={Colors.primary} />
            <Text style={{ fontSize: 18, padding: 10 }}>Sending code...</Text>
          </View>
        )}
        <Text style={styles.description}>
          Wassap will need to verify your account. Carrier charges may apply.
        </Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>Brazil</Text>
            <Ionicons name='chevron-forward' size={20} color={Colors.gray} />
          </View>
          <View style={styles.separator} />
          <MaskInput
            value={phoneNumber}
            keyboardType='numeric'
            autoFocus={true}
            placeholder='Phone number'
            style={styles.input}
            onChangeText={(masked, unmasked) => {
              setPhoneNumber(masked); // you can use the unmasked value as well
            }}
            mask={GER_PHONE}
          />
        </View>
        <Text style={styles.legal}>
          You must be{' '}
          <Text style={styles.link} onPress={openLink}>
            at least 16 years old
          </Text>{' '}
          to register. Learn how WhatsApp works with the{' '}
          <Text style={styles.link} onPress={openLink}>
            Meta Companies
          </Text>
          .
        </Text>
        {/* Mask */}

        <View style={{ flex: 1 }} />
        {/* */}
        <TouchableOpacity
          onPress={sendOTP}
          disabled={phoneNumber === ''}
          style={[
            styles.button,
            phoneNumber !== '' ? styles.enabled : null,
            { marginBottom: bottom },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              phoneNumber !== '' ? styles.enabled : null,
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
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
  list: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: '100%',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    marginBottom: 10,
  },
  listItemText: {
    color: Colors.primary,
    fontSize: 16,
  },
  separator: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray,
    opacity: 0.4,
  },
  legal: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.gray,
  },
  link: {
    color: Colors.primary,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
    color: '#fff',
  },
  buttonText: {
    color: Colors.gray,
    fontSize: 22,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    fontSize: 16,
    padding: 6,
    marginTop: 10,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Page;
