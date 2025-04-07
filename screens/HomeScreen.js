import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { platillos } from '../data/platillos';

const HomeScreen = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <FlatList
      data={platillos}
      keyExtractor={(item) => item.id}
      numColumns={isLandscape ? 2 : 1}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.card, { flex: 1 }]}
          onPress={() => navigation.navigate('Detalles', { platillo: item })}
        >
          <Image source={{ uri: item.imagen }} style={styles.image} />
          <Text style={styles.title}>{item.nombre}</Text>
          <Text>{item.descripcion}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    padding: 10,
  },
  image: {
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
