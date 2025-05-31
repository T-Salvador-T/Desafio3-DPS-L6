import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen({ navigation }) {
  const [recursos, setRecursos] = useState([]);
  const [expandidoId, setExpandidoId] = useState(null);
  const isFocused = useIsFocused();

  const fetchRecursos = async () => {
    try {
      const response = await fetch('https://68363a32664e72d28e40343a.mockapi.io/API/v1/recuros');
      const data = await response.json();
      setRecursos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const eliminarRecurso = (id) => {
    Alert.alert(
      '¿Eliminar recurso?',
      'Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              await fetch(`https://68363a32664e72d28e40343a.mockapi.io/API/v1/recuros/${id}`, {
                method: 'DELETE',
              });
              fetchRecursos();
            } catch (error) {
              console.error(error);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  useEffect(() => {
    if (isFocused) {
      fetchRecursos();
    }
  }, [isFocused]);

  const toggleExpandir = (id) => {
    setExpandidoId(expandidoId === id ? null : id);
  };

  const renderItem = ({ item }) => {
    const expandido = item.id === expandidoId;

    return (
      <TouchableOpacity onPress={() => toggleExpandir(item.id)} style={styles.card}>
        <Image source={{ uri: item.imagen }} style={styles.image} />
        <Text style={styles.title}>{item.titulo}</Text>

        {expandido && (
          <>
            <Text style={styles.descripcion}>{item.descripcion}</Text>
            <Text style={styles.tipo}>Tipo: {item.tipo}</Text>

            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate('Editar', { recurso: item })}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => eliminarRecurso(item.id)}
              >
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Agregar')}
        style={styles.addButton}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Agregar Recurso</Text>
      </TouchableOpacity>

      <FlatList
        data={recursos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}
 
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2b2b2b',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#3d3d3d',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    height: 120,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 8,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  descripcion: {
    marginTop: 6,
    fontSize: 14,
    color: '#cccccc',
  },
  tipo: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 4,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#9c27b0',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    flex: 0.48,
  },
  deleteButton: {
    backgroundColor: '#b00020',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    flex: 0.48,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#6a1b9a',
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
