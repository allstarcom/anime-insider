import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import AnimeList from '../components/Anime/AnimeList'; 

export default function AnimeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <AnimeList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Set background color as desired
  },
  cardContainer: {
    flex: 1, // Occupy full available space
    backgroundColor: '#fff', // Set card container background color
    borderRadius: 10, // Add border radius for rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4, // Simulate a shadow effect
    marginHorizontal: 20, // Add horizontal margin for spacing
    marginVertical: 20, // Add vertical margin for spacing
  },
});
