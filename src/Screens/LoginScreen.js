import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../redux/authSlice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Please enter your email and password.');
            return;
        }
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const { user } = userCredential;
            dispatch(loginSuccess({ email, uid: user.uid }));
            await AsyncStorage.setItem('user', JSON.stringify({ email, uid: user.uid }));
            setError('');
            navigation.navigate("Anime"); 
        } catch (error) {
            console.log(error)
            setError('Invalid email or password. Please try again.');
        }
    };


    const handleRegister = async () => {
        navigation.navigate('Register');
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry 
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Register" onPress={handleRegister} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});

export default Login;
