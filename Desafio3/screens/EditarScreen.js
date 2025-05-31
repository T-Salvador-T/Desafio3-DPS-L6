import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

const EditarScreen = ({ route, navigation }) => {
  const { recurso } = route.params;

  const [titulo, setTitulo] = useState(recurso.titulo);
  const [descripcion, setDescripcion] = useState(recurso.descripcion);
  const [tipo, setTipo] = useState(recurso.tipo);
  const [imagen, setImagen] = useState(recurso.imagen);

  const handleEditar = async () => {
    try {
      const response = await fetch(`https://68363a32664e72d28e40343a.mockapi.io/API/v1/recuros/${recurso.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo, descripcion, tipo, imagen }),
      });

      if (response.ok) {
        Alert.alert('¡Actualizado!', 'El recurso fue editado correctamente.');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'No se pudo actualizar el recurso.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ocurrió un error al editar.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Editar Recurso</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />

      <Text style={styles.label}>Descripción</Text>
      <TextInput style={styles.input} value={descripcion} onChangeText={setDescripcion} />

      <Text style={styles.label}>Tipo</Text>
      <TextInput style={styles.input} value={tipo} onChangeText={setTipo} />

      <Text style={styles.label}>Imagen URL</Text>
      <TextInput style={styles.input} value={imagen} onChangeText={setImagen} />

      <TouchableOpacity style={styles.button} onPress={handleEditar}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#ccc',
    fontSize: 16,
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
    marginTop: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
