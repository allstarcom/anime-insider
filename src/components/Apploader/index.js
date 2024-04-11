import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { setWatchLater } from '../../redux/watchLaterSlice';
import * as api from '../../api/animeApi'
import { loginSuccess, logout } from '../../redux/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as database from '../../database/index.js';


export default function Apploader() {

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                const { email, uid } = JSON.parse(userData);
                dispatch(loginSuccess({ email, uid }));
            }
        })();

    }, [dispatch]);

}