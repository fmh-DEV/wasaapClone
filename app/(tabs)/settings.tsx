import BoxIcon from '@/components/BoxIcon';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, ScrollView, FlatList } from 'react-native';

const devices = [
  {
    name: 'Broadcast Lists',
    icon: 'megaphone',
    backgroundColor: Colors.green,
  },
  {
    name: 'Starred Messages',
    icon: 'star',
    backgroundColor: Colors.yellow,
  },
  {
    name: 'Linked Devices',
    icon: 'laptop-outline',
    backgroundColor: Colors.green,
  },
];

const items = [
  {
    name: 'Account',
    icon: 'key',
    backgroundColor: Colors.primary,
  },
  {
    name: 'Privacy',
    icon: 'lock-closed',
    backgroundColor: '#33A5D1',
  },
  {
    name: 'Chats',
    icon: 'logo-whatsapp',
    backgroundColor: Colors.green,
  },
  {
    name: 'Notifications',
    icon: 'notifications',
    backgroundColor: Colors.red,
  },
  {
    name: 'Storage and Data',
    icon: 'repeat',
    backgroundColor: Colors.green,
  },
];

const support = [
  {
    name: 'Help',
    icon: 'information',
    backgroundColor: Colors.primary,
  },
  {
    name: 'Tell a Friend',
    icon: 'heart',
    backgroundColor: Colors.red,
  },
];

const Page = () => {
  //
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView>
        <View style={defaultStyles.block}>
          <FlatList
            scrollEnabled={false}
            data={devices}
            renderItem={({ item }) => (
              <View style={defaultStyles.item}>
                <BoxIcon
                  name={item.icon}
                  backgroundColor={item.backgroundColor}
                />
                <Text style={{ flex: 1, fontSize: 18 }}>{item.name}</Text>
                <Ionicons
                  name='chevron-forward'
                  size={20}
                  color={Colors.gray}
                />
              </View>
            )}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Page;
