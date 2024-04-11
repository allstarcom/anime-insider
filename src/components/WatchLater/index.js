import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';
import * as database from '../../database/index.js';
import { setWatchLater } from '../../redux/watchLaterSlice.js';
import { View, Text, ScrollView, StyleSheet, TouchableHighlight, Alert } from 'react-native';
import AnimeCard from '../AnimeCard/AnimeCard.js';
import { FontAwesome } from '@expo/vector-icons'; 

export default function WatchLater() {
    const dispatch = useDispatch();
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        const loadWatchLaterList = async () => {
            try {
                if (user) {
                    const watchLaterList = await database.load(user.uid);
                    dispatch(setWatchLater(watchLaterList));
                }
            } catch (error) {
                console.error('Error loading watch later list:', error.message);
            }
        };

        loadWatchLaterList();
    }, [dispatch, user]);

    const watchLaterList = useSelector(state => state.watchlater.watchlaters);

    const handleDelete = (animeId) => {
        try {
            Alert.alert(
                'Delete Anime',
                'Are you sure you want to delete this anime?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Delete',
                        onPress: async () => {
                            try {
                                await database.remove(user.uid, animeId.id);
                                const updatedList = watchLaterList.filter(anime => animeId._id !== anime._id);
                                dispatch(setWatchLater(updatedList));
                            } catch (error) {
                                console.error('Error deleting anime:', error.message);
                            }
                        },
                        style: 'destructive',
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error('Error showing delete confirmation:', error.message);
        }
    };


    return (
        <View>
            <ScrollView>
                {watchLaterList && watchLaterList.length > 0 ? (
                    watchLaterList.map(anime => (
                        <View key={anime._id} style={styles.cardContainer}>
                            <AnimeCard data={anime} />
                            <TouchableHighlight
                                onPress={() =>
                                    handleDelete(anime)}
                                underlayColor="transparent"
                                style={styles.deleteButton}>
                                <FontAwesome name="trash-o" size={24} color="white" />
                            </TouchableHighlight>
                        </View>
                    ))
                ) : (
                    <View>
                        <Text>No anime in watch later list</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

    deleteButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 10,
    },
});
