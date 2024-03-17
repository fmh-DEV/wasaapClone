import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

const Page = () => {
  //
  const { phone } = useLocalSearchParams<{ phone: string; signin: string }>();

  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};

export default Page;
