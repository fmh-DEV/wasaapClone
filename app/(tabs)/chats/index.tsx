import { View, Text, ScrollView } from 'react-native';
import React from 'react';

const Page = () => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior='automatic'
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Text>INSIDE</Text>
    </ScrollView>
  );
};

export default Page;
