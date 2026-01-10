import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../src/types';
import api from '../src/api';

// Tipagem do navigation para HomeScreen
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Tabs'
>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [tarefas, setTarefas] = useState<any[]>([]);
  const temas = ['geografia', 'matematica'];

  // Carregar tarefas da API
  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const response = await api.get('/tarefas'); // rota do seu backend
        console.log('Resposta da API:', response.data); // 👈 ADICIONADO AQUI
        setTarefas(response.data);

      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    fetchTarefas();
  }, []);

  return (
    <View
      style={[
        styles.root,
        {
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        },
      ]}
    >
      <StatusBar translucent backgroundColor="#E9E9E9" barStyle="dark-content" />

      <View style={[styles.bar]}>
      <View style={styles.leftGroup}>
        <Image
          source={require('../assets/iconePerfil.png')}
          style={{ width: 80, height: 80 }} // coloque sua imagem local ou use uma URL
          resizeMode="contain"
        />
        </View>
        </View>
        <Text style={styles.text}>5</Text>

      <View style={styles.rightGroup}>
      <View style={styles.statsContainer}>

        <Image
          source={require('../assets/iconeGatinho.png')}
          style={{ width: 30, height: 30 }} // coloque sua imagem local ou use uma URL
          resizeMode="contain"
        />
        <Text style={styles.text}>7</Text>
      </View>
      <View style={styles.statsContainer}>
        <Image
          source={require('../assets/iconePatinha.png')}
          style={{ width: 30, height: 30 }} // coloque sua imagem local ou use uma URL
          resizeMode="contain"
        />
        
        <Text style={styles.text}>700</Text>

        <Image
          source={require('../assets/iconeXp.png')}
          style={{ width: 30, height: 30 }} // coloque sua imagem local ou use uma URL
          resizeMode="contain"
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

            <Image
        source={require('../assets/Gatinho.png')}
        style={{ width: 150, height: 100 }} 
        resizeMode="contain"
      />

        <View style={styles.zigzagContainer}>
          {tarefas.map((tarefa, index) => (
            <TouchableOpacity
              key={tarefa._id}
              style={[
                styles.circle,
                {
                  alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
                  marginLeft: index % 2 === 0 ? 100 : 0,
                  marginRight: index % 2 === 0 ? 0 : 100,
                },
              ]}
              onPress={() =>
                navigation.navigate('Tarefa', {
                  tema: temas[index % temas.length],
                  tarefaId: tarefa._id, // envia o ID real
                })
              }
            >
              <Text style={styles.circleText}>
                {tarefa.titulo || `Tarefa ${index + 1}`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

          <View style={[styles.bar, { paddingBottom: 10 }]}>
      <Text style={styles.barText}>Rodapé</Text>
      <Image
        source={require('../assets/Gatinho.png')}
        style={{ width: 150, height: 100 }} 
        resizeMode="contain"
      />
    </View>

      <View style={[styles.bar, { paddingBottom: 10 }]}>
        <Text style={styles.barText}>Rodapé</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

// ESTILOS
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },
  bar: {
    backgroundColor: '#E9E9E9',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  text: {
    fontSize: 18,
  },

  barText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  zigzagContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#4226bdff',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  circleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
