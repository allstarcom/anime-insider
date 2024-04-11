import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as database from '../../database/index.js';
import { getAuth } from 'firebase/auth';
import { addWatchLater } from '../../redux/watchLaterSlice.js';
import { useDispatch, useSelector } from 'react-redux';


export default function AnimeDetail({ route }) {
    const anime = route.params.anime;
    const [isBookmarked, setIsBookmarked] = useState(false);
    const dispatch = useDispatch();

    const addAnime = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                database.save(user.uid,anime)
                dispatch(addWatchLater(anime));
                setIsBookmarked(true); 


            } else {
                console.error('No user is currently logged in.');
            }
        } catch (error) {
            console.error('Error adding anime to Firestore:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: anime.image }} style={styles.image} />
            </View>
            <View style={styles.infoContainer}>
                <TouchableOpacity onPress={addAnime} style={styles.bookmarkIcon}>
                    <FontAwesome name={isBookmarked ? "bookmark" : "bookmark-o"} size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.title}>{anime.title}</Text>
                {anime.alternativeTitles && (
                    <Text style={styles.altTitles}>
                        Alternative Titles: {anime.alternativeTitles.join(', ')}
                    </Text>
                )}
                <View style={styles.details}>
                    <Text style={styles.detailLabel}>Genres:</Text>
                    <Text style={styles.detailText}>{anime.genres.join(', ')}</Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.detailLabel}>Status:</Text>
                    <Text style={styles.detailText}>{anime.status}</Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.detailLabel}>Episodes:</Text>
                    <Text style={styles.detailText}>{anime.episodes}</Text>
                </View>
                <ScrollView style={styles.synopsisContainer}>
                    <Text style={styles.synopsis}>{anime.synopsis} (Synopsis)</Text>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
    },
    imageContainer: {
        flex: 1,
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    infoContainer: {
        flex: 2,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#222',
    },
    altTitles: {
        fontSize: 16,
        marginBottom: 5,
        color: '#666',
    },
    details: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    detailLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#999',
        width: 80,
    },
    detailText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    synopsisContainer: {
        flex: 1,
        maxHeight: 300,
    },
    synopsis: {
        fontSize: 14,
        lineHeight: 20,
        color: '#333',
    },
    bookmarkIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1, // Ensure the icon is clickable
    }
});
