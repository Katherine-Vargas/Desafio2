import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'citas_taller';

const CitaForm = ({ navigation, route }) => {
  const editando = !!route.params?.cita;
  const [nombre, setNombre] = useState(route.params?.cita?.nombre || '');
  const [modelo, setModelo] = useState(route.params?.cita?.modelo || '');
  const [fecha, setFecha] = useState(route.params?.cita?.fecha || '');
  const [hora, setHora] = useState(route.params?.cita?.hora || '');
  const [descripcion, setDescripcion] = useState(route.params?.cita?.descripcion || '');

  const guardarCita = async () => {
    if (nombre.length < 3) {
      Alert.alert('Error', 'El nombre debe tener al menos 3 caracteres');
      return;
    }

    const fechaHora = new Date(`${fecha}T${hora}`);
    if (fechaHora <= new Date()) {
      Alert.alert('Error', 'La fecha y hora deben ser futuras');
      return;
    }

    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const citas = data ? JSON.parse(data) : [];

    const duplicado = citas.some(
      (c) => c.fecha === fecha && c.modelo.toLowerCase() === modelo.toLowerCase() && (!editando || c.id !== route.params.cita.id)
    );
    if (duplicado) {
      Alert.alert('Error', 'Ya existe una cita con esta fecha y vehículo');
      return;
    }

    const nuevaCita = {
      id: editando ? route.params.cita.id : Date.now().toString(),
      nombre,
      modelo,
      fecha,
      hora,
      descripcion,
    };

    const nuevasCitas = editando
      ? citas.map((c) => (c.id === nuevaCita.id ? nuevaCita : c))
      : [...citas, nuevaCita];

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nuevasCitas));
    navigation.navigate('Inicio', { refresh: true });
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nombre del Cliente" value={nombre} onChangeText={setNombre} style={styles.input} />
      <TextInput placeholder="Modelo del Vehículo" value={modelo} onChangeText={setModelo} style={styles.input} />
      <TextInput placeholder="Fecha (YYYY-MM-DD)" value={fecha} onChangeText={setFecha} style={styles.input} />
      <TextInput placeholder="Hora (HH:MM)" value={hora} onChangeText={setHora} style={styles.input} />
      <TextInput placeholder="Descripción (opcional)" value={descripcion} onChangeText={setDescripcion} style={styles.input} />
      <Button title={editando ? "Guardar Cambios" : "Guardar Cita"} onPress={guardarCita} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});

export default CitaForm;
