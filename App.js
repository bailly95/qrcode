import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Linking from 'expo-linking';

export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [onScan, setOnScan] = useState(true);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({type, data}) => {
        setOnScan(true);
        // Check if the scanned data is a valid URL
        if (Linking.canOpenURL(data)) {
            Linking.openURL(data);
        } else {
            alert('Invalid URL: ' + data);
        }
    };

    if (hasPermission === null) {
        return <Text>Demande des autorisations pour la caméra</Text>;
    }
    if (hasPermission === false) {
        return <Text>Aucun accès à la caméra</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Application de QR Codes</Text>
            </View>
            <BarCodeScanner
                onBarCodeScanned={onScan ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            <View style={styles.buttonContainer}>
                <Pressable
                    style={({pressed}) => [
                        styles.button,
                        {backgroundColor: pressed ? '#03AFD5FF' : '#5A03D5FF'},
                    ]}
                    onPress={() => setOnScan(false)}
                >
                    <Text style={styles.text}>Appuyez pour scanner</Text>
                </Pressable>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#03d5cb',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: "6%",
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,


    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    titleContainer: {
        position: 'absolute',
        top: "8%",
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
    },
});

