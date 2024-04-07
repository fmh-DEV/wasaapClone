import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  SystemMessage,
  IMessage,
} from 'react-native-gifted-chat';
import messageData from '@/assets/data/messages.json';
import Colors from '@/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const Page = () => {
  //
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState('');

  const insets = useSafeAreaInsets();

  useEffect(() => {
    setMessages([
      ...messageData.map((message) => {
        return {
          _id: message.id,
          text: message.msg,
          createdAt: new Date(message.date),
          user: {
            _id: message.from,
            name: message.from ? 'You' : 'Bob',
          },
        };
      }),
      {
        _id: 0,
        system: true,
        text: 'All your base are belong to us',
        createdAt: new Date(),
        user: {
          _id: 0,
          name: 'Bot',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: any[]) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  //
  return (
    <ImageBackground
      source={require('@/assets/images/pattern.png')}
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        marginBottom: insets.bottom,
      }}
    >
      <GiftedChat
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderAvatar={null}
        onInputTextChanged={setText}
        maxComposerHeight={100}
        renderSystemMessage={(props) => {
          return (
            <SystemMessage {...props} textStyle={{ color: Colors.gray }} />
          );
        }}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: '#000',
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: '#fff',
                },
                right: {
                  backgroundColor: Colors.lightGreen,
                },
              }}
            />
          );
        }}
        renderSend={(props) => (
          <View
            style={{
              flexDirection: 'row',
              height: 44,
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              paddingHorizontal: 12,
            }}
          >
            {text.length > 0 && (
              <Send
                {...props}
                containerStyle={{
                  justifyContent: 'center',
                }}
              >
                <Ionicons name='send' color={Colors.primary} size={28} />
              </Send>
            )}
            {text.length === 0 && (
              <>
                <Ionicons
                  name='camera-outline'
                  color={Colors.primary}
                  size={28}
                />
                <Ionicons name='mic-outline' color={Colors.primary} size={28} />
              </>
            )}
          </View>
        )}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  composer: {},
});

export default Page;
