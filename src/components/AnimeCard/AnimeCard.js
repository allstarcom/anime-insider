import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const AnimeCard = ({ data }) => {
  if (data.length == 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nothing here</Text>
      </View>
    );
  }

  const { _id, title, image, genres, status } = data;

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: image }} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardText}>Genres: {genres.join(', ')}</Text>
        <Text style={styles.cardText}>Status: {status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardInfo: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
});

export default AnimeCard;
