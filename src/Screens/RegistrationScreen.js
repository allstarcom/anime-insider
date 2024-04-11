import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, MaterialCommunityIcons } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { loginSuccess } from '../redux/authSlice';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Registration = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    
    const handleRegister = async () => {
        try {
            if (!email || !password) {
                setError('Please enter your email and password.');
                return;
            }

            if (password !== confirmPassword) {
                setError('Passwords do not match. Please try again.');
                return;
            }
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const { user } = userCredential;
            dispatch(loginSuccess({ email, uid: user.uid }));
            await AsyncStorage.setItem('user', JSON.stringify({ email, uid: user.uid }));
            setError('');
            navigation.navigate('Anime');
        } catch (error) {
            setError('Error registering user:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
            >
            </TextInput>
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
            >
            </TextInput>
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Registration;

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
        fontFamily: 'HelveticaNeue-Medium', 
    },
    error: {
        color: 'red',
        marginBottom: 10, 
    },
    input: {
        width: '100%', 
        padding: 15, 
        marginBottom: 15, 
        borderRadius: 5, 
        borderWidth: 1,
        borderColor: '#ccc', 
        fontFamily: 'HelveticaNeue', 
    },
    button: {
        backgroundColor: '#007bff', 
        padding: 15, 
        borderRadius: 10, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#007bff', 
        shadowColor: '#007bff', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2, 
    },
    buttonText: {
        color: 'white', 
        fontSize: 16, 
        fontWeight: 'bold', 
    },
    eyeIcon: {
        position: 'absolute', 
        right: 10, 
        top: 12, 
    },
});
