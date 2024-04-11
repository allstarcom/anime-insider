import { ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import styles from '../../styles/main';
import Anime from './Anime'; // Removed curly braces
import * as api from '../../api/animeApi'
import { useState, useEffect } from 'react';


export default function AnimeList() {

    const [animeList, setAnimeList] = useState([]); 
    useEffect(() => {
        const fetchData = async () => {
            const data = await api.get_all_animes(1, 10);
            setAnimeList(data); // Update animeList state with fetched data
        };
        fetchData();
    }, []);

    return (
        <>
            {
                animeList.length > 0 ? (
                    <ScrollView>
                        {animeList.map((anime, index) => (
                            <Anime key={index} {...anime} />
                        ))}
                    </ScrollView>
                ) : (
                    <Text>No Anime available</Text>

                )

            }

        </>

    );
}
