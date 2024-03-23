import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import calls from '@/assets/data/calls.json';
import { defaultStyles } from '@/constants/Styles';

const Page = () => {
  //
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState(calls);
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
      <ScrollView contentInsetAdjustmentBehavior='automatic'>
        <View style={defaultStyles.block}>
          <FlatList
            data={items}
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            renderItem={({ item }) => (
              <View style={[defaultStyles.item]}>
                <Image source={{ uri: item.img }} style={styles.avatar} />
                <View style={{ flex: 1, gap: 2 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: item.missed ? Colors.red : '#000',
                    }}
                  >
                    {item.name}
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 4 }}>
                    <Ionicons
                      name={item.video ? 'videocam' : 'call'}
                      size={16}
                      color={Colors.gray}
                    />
                    <Text style={{ flex: 1, color: Colors.gray }}>
                      {item.incoming ? 'Incoming' : 'Outgoing'}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Page;