import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet } from 'react-native';

import { ref, get, onValue } from 'firebase/database';
import database from '../../config/firebaseconfig';
import styles from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Rotas({ navigation }) {
    const [rotas, setRotas] = useState([]);

    useEffect(function() {
        const rotasRef = ref(database, 'routes');
        onValue(rotasRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const rotasList = Object.keys(data).map((key) => ({
                  id: key,
                  ...data[key],
                }));
                setRotas(rotasList);
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.listFilter}>
                <TouchableOpacity style={StyleSheet.compose(styles.filter, styles.filterSelected)}>
                    <Text>Todos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filter}>
                    <Text>Meu</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={rotas}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity
                            style={styles.listRota}
                            onPress={() => navigation.navigate("Detalhe Rota", {
                                id: item.id
                            })}>
                            <Text>{item.descricao}</Text>
                        </TouchableOpacity>
                    )
                }}
            >
            </FlatList>
        </View>
    )
}