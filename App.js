import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button, Pressable} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
import * as Linking from 'expo-linking';

export default function App() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);

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
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            {scanned && (
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={() => setScanned(false)}>
                        <Text style={styles.text}>Appuyez pour scanner de nouveau</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: "6%",
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#9f18b3',
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

