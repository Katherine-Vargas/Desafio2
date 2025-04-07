import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, ScrollView } from 'react-native';

const DetailScreen = ({ route }) => {
  const { platillo } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: platillo.imagen }} style={styles.image} />
      <Text style={styles.title}>{platillo.nombre}</Text>
      <Text style={styles.text}>{platillo.descripcion}</Text>
      <Text style={styles.subTitle}>Ingredientes:</Text>
      {platillo.ingredientes.map((ing, i) => (
        <Text key={i} style={styles.text}>• {ing}</Text>
      ))}
      <Text style={styles.subTitle}>Región: <Text style={styles.text}>{platillo.region}</Text></Text>
      <Text style={styles.subTitle}>Precio: <Text style={styles.text}>${platillo.precio.toFixed(2)}</Text></Text>
      <Text style={styles.subTitle}>Categoría: <Text style={styles.text}>{platillo.categoria}</Text></Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    height: 250,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subTitle: {
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    fontSize: 15,
  },
});

export default DetailScreen;
