import { View, Text } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export type BoxIconProps = {
  name: typeof Ionicons.defaultProps;
  backgroundColor: string;
};

const BoxIcon = ({ name, backgroundColor }: BoxIconProps) => {
  return (
    <View style={{ backgroundColor, padding: 4, borderRadius: 8 }}>
      <Ionicons name={name} size={22} color='white' />
    </View>
  );
};

export default BoxIcon;
