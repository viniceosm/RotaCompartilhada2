import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
const mapRef = React.createRef();

import * as Location from 'expo-location';

import { ref, get, onValue } from 'firebase/database';
import database from '../../config/firebaseconfig';

import axios from 'axios';
import styles from './style';

export default function DetalheRota({ navigation, route }) {
    const idRota = route.params.id;

    const apiKey = 'AIzaSyBe5Fl8_x7Mu7zxfHjTEA1LLrTBojDqz3Q';

    const [rota, setRota] = useState({});
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [direcaoRota, setDirecaoRota] = useState(undefined);

    function decodePolyline(polylineString) {
        var index = 0,
            len = polylineString.length,
            lat = 0,
            lng = 0,
            coordinates = [];
    
        while (index < len) {
            var b,
                shift = 0,
                result = 0;
    
            do {
                b = polylineString.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
    
            var dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
            lat += dlat;
    
            shift = 0;
            result = 0;
    
            do {
                b = polylineString.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
            } while (b >= 0x20);
    
            var dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
            lng += dlng;
    
            coordinates.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
        }
    
        return coordinates;
    }    

    useEffect(function() {
        const rotasRef = ref(database, 'routes/' + idRota);
        onValue(rotasRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setRota(data);
            }
        });

        (async () => {
            let destination = '';
            let origin = '';

            if (rota.destino && rota.destino.tipo == 'place_id') {
                try {
                    let response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${rota.destino.valor}&fields=geometry&key=${apiKey}`);
                    const { lat, lng } = response.data.result.geometry.location;
                    destination = `${lat},${lng}`;
                    console.log('destination', destination);
                } catch (error) {
                    console.error('Erro ao obter as coordenadas do destino:', error);
                }
            }
            
            if (rota.origem && rota.origem.tipo == 'usuario') {
                try {
                    const snapshot = await get(ref(database, 'users/' + rota.origem.valor));
                    const data = snapshot.val();
                    if (data && data.userLatLng) {
                        origin = `${data.userLatLng.lat},${data.userLatLng.lng}`;
                        console.log('origin', origin);

                        if (mapRef.current) {
                            mapRef.current.animateToRegion({
                                latitude: data.userLatLng.lat,
                                longitude: data.userLatLng.lng,
                                latitudeDelta: 0.002,
                                longitudeDelta: 0.002
                            });
                        }
                    }

                    
                } catch (error) {
                    console.error('Erro ao obter os dados de origem do usuário:', error);
                }

            }
            
            if (origin !== '' && destination !== '') {
                try {
                    const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}&overview_polyline=true`);
                    const route = response.data.routes[0]; // Obtenha a primeira rota

                    const polylineString = route.overview_polyline.points;
                    const decodedPolyline = decodePolyline(polylineString);
                    console.log('aaa', decodedPolyline);
                    setDirecaoRota(decodedPolyline);
                } catch (error) {
                    console.error('Erro ao obter a rota:', error);
                }
            }
        })();
        

        // (async () => {
        //     let { status } = await Location.requestForegroundPermissionsAsync();
        //     if (status !== 'granted') {
        //     //   setErrorMsg('Permission to access location was denied');
        //       return;
        //     }
      
        //     let location = await Location.getCurrentPositionAsync({});
        //     setLatitude(location.coords.latitude);
        //     setLongitude(location.coords.longitude);
        //     mapRef.current.animateToRegion({
        //         latitude: location.coords.latitude,
        //         longitude: location.coords.longitude,
        //         latitudeDelta: 0.002,
        //         longitudeDelta: 0.002
        //     });
        // })();
    }, []);

    return (
        <View>
            <Text style={styles.descricaoRota}>{rota.descricao}</Text>

            <MapView style={styles.map}
                ref={mapRef}
                initialRegion={{
                    latitude, // Latitude inicial,
                    longitude, // Longitude inicial,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}>

                {direcaoRota && (
                    <Polyline
                        coordinates={direcaoRota}
                        strokeWidth={4}
                        strokeColor="blue"
                    />
                )}
            </MapView>
        </View>
    )
}