import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'citas_taller';

const HomeScreen = ({ navigation, route }) => {
  const [citas, setCitas] = useState([]);

  const cargarCitas = async () => {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) setCitas(JSON.parse(data));
  };

  const eliminarCita = (id) => {
    Alert.alert('Confirmar', '¿Deseas eliminar esta cita?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          const nuevasCitas = citas.filter((cita) => cita.id !== id);
          setCitas(nuevasCitas);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nuevasCitas));
        },
      },
    ]);
  };

  useEffect(() => {
    cargarCitas();
  }, [route.params?.refresh]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.nombre}</Text>
      <Text>{item.modelo}</Text>
      <Text>{item.fecha} {item.hora}</Text>
      <View style={styles.cardButtons}>
        <Button title="Editar" onPress={() => navigation.navigate('Editar Cita', { cita: item })} />
        <Button title="Eliminar" color="red" onPress={() => eliminarCita(item.id)} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Agregar Cita" onPress={() => navigation.navigate('Agregar Cita')} />
      <FlatList data={citas} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default HomeScreen;
