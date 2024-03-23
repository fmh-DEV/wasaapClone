import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const Page = () => {
  //
  const [isEditing, setIsEditing] = useState(false);
  const onEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={onEdit}>
              <Text style={{ color: Colors.primary, fontSize: 18 }}>
                {isEditing ? 'Done' : 'Edit'}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView contentInsetAdjustmentBehavior='automatic'></ScrollView>
    </View>
  );
};

export default Page;
