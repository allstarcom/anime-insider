import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WatchLater from '../components/WatchLater';


export default function WatchLaterScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <WatchLater />
    </View>
  );
}