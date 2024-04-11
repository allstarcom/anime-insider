import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styles from '../../styles/main.js'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as database from '../../database/index.js';
import { useDispatch } from 'react-redux'
import AnimeCard from '../AnimeCard/AnimeCard.js';


export default function Anime(props) {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate('Anime Detail', { anime : props });
    }

    return (
        <>
            <TouchableOpacity onPress={handlePress}>
                <AnimeCard data={props} />
            </TouchableOpacity>
        </>
    )
}
