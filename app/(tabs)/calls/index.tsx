import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
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
import { format } from 'date-fns';
import { SegmentedControl } from '@/components/SegmentedControl';
import * as Haptics from 'expo-haptics';
import Animated, {
  CurvedTransition,
  FadeInUp,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import SwipeableRow from '@/components/SwipeableRow';

const transition = CurvedTransition.delay(100);

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const Page = () => {
  //
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState(calls);
  const [selectedOption, setSelectedOption] = useState('All');
  const editing = useSharedValue(-30);

  const animatedRowStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: editing.value }],
  }));

  const onEdit = () => {
    let editingNew = !isEditing;
    editing.value = editingNew ? 0 : -30;
    setIsEditing(editingNew);
  };
  const removeCall = (item: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  //
  useEffect(() => {
    if (selectedOption === 'All') {
      setItems(calls);
    } else if (selectedOption === 'Missed') {
      setItems(calls.filter((item) => item.missed));
    }
  }, [selectedOption]);
  //
  const transition = CurvedTransition.delay(100);

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <SegmentedControl
              options={['All', 'Missed']}
              selectedOption={selectedOption}
              onOptionPress={setSelectedOption}
            />
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={onEdit}>
              <Text style={{ color: Colors.primary, fontSize: 18 }}>
                {isEditing ? 'Done' : 'Edit'}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Animated.View style={defaultStyles.block} layout={transition}>
          <Animated.FlatList
            skipEnteringExitingAnimations
            data={items}
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => (
              <View style={defaultStyles.separator} />
            )}
            itemLayoutAnimation={transition}
            renderItem={({ item, index }) => (
              <SwipeableRow onDelete={() => removeCall(item)}>
                <Animated.View
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  entering={FadeInUp.delay(index * 20)}
                  exiting={FadeOut}
                >
                  <AnimatedTouchableOpacity
                    onPress={() => removeCall(item)}
                    style={animatedRowStyles}
                  >
                    <Ionicons
                      name='remove-circle'
                      size={24}
                      color={Colors.red}
                    />
                  </AnimatedTouchableOpacity>
                  <Animated.View
                    style={[
                      defaultStyles.item,
                      animatedRowStyles,
                      { paddingLeft: 15 },
                    ]}
                  >
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
                    <View
                      style={{
                        flexDirection: 'row',
                        gap: 6,
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{ color: Colors.gray }}>
                        {format(item.date, 'MM.dd.yy')}
                      </Text>
                      <Ionicons
                        name='information-circle-outline'
                        size={24}
                        color={Colors.primary}
                      />
                    </View>
                  </Animated.View>
                </Animated.View>
              </SwipeableRow>
            )}
          />
        </Animated.View>
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
