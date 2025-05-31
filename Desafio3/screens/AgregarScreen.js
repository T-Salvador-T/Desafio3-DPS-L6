import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Agregar = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState('');
  const [imagen, setImagen] = useState('');
  const navigation = useNavigation();

  const guardarRecurso = () => {
    if (!titulo || !descripcion || !tipo || !imagen) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    const nuevoRecurso = { titulo, descripcion, tipo, imagen };

    fetch('https://68363a32664e72d28e40343a.mockapi.io/API/v1/recuros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoRecurso),
    })
      .then(response => response.json())
      .then(() => {
        Alert.alert('Éxito', 'Recurso agregado correctamente');
        navigation.goBack(); // Vuelve a Home
      })
      .catch(error => {
        console.error('Error al agregar recurso:', error);
        Alert.alert('Error', 'No se pudo agregar el recurso');
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Agregar Recurso</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Fundamentos de Sistemas"
        placeholderTextColor="#888"
        value={titulo}
        onChangeText={setTitulo}
      />


      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Libro introductorio a los sistemas..."
        placeholderTextColor="#888"
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <Text style={styles.label}>Tipo</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Libro, Video, Artículo..."
        placeholderTextColor="#888"
        value={tipo}
        onChangeText={setTipo}
      />

      <Text style={styles.label}>Imagen (URL)</Text>
      <TextInput
        style={styles.input}
        placeholder="https://example.com/imagen.png"
        placeholderTextColor="#888"
        value={imagen}
        onChangeText={setImagen}
      />

      <TouchableOpacity onPress={guardarRecurso} style={styles.button}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Agregar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: '#ccc',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 10,
    marginTop: 5,
    borderRadius: 8,
    backgroundColor: '#1e1e1e',
    color: '#fff',
  },
  button: {
    backgroundColor: '#9c27b0',
    padding: 14,
    marginTop: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
