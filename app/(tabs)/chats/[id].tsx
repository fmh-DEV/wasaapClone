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
import ChatMessageBox from '@/components/ChatMessageBox';
import ReplyMessageBar from '@/components/ReplyMessageBar';

const Page = () => {
  //
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState('');

  const insets = useSafeAreaInsets();

  const swipeableRowRef = useRef<Swipeable | null>(null);
  const [replyMessage, setReplyMessage] = useState<IMessage | null>(null);

  const updateRowRef = useCallback(
    (ref: any) => {
      if (
        ref &&
        replyMessage &&
        ref.props.children.props.currentMessage?._id === replyMessage._id
      ) {
        swipeableRowRef.current = ref;
      }
    },
    [replyMessage]
  );

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

  useEffect(() => {
    if (replyMessage && swipeableRowRef.current) {
      swipeableRowRef.current.close();
      swipeableRowRef.current = null;
    }
  }, [replyMessage]);

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
        textInputProps={styles.composer}
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
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={{ backgroundColor: Colors.background }}
            renderActions={() => (
              <View>
                <Ionicons name='add' color={Colors.primary} size={28} />
              </View>
            )}
          />
        )}
        renderMessage={(props) => (
          <ChatMessageBox
            {...props}
            updateRowRef={updateRowRef}
            setReplyOnSwipeOpen={setReplyMessage}
          />
        )}
        renderChatFooter={() => (
          <ReplyMessageBar
            clearReply={() => setReplyMessage(null)}
            message={replyMessage}
          />
        )}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  composer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
});

export default Page;
