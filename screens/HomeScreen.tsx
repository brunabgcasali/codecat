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

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Tabs'
>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [tarefas, setTarefas] = useState<any[]>([]);
  const temas = ['geografia', 'matematica'];

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const response = await api.get('/tarefas');
        setTarefas(response.data || []);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        setTarefas([]);
      }
    };

    fetchTarefas();
  }, []);

  return (
    <View
      style={[
        styles.root,
        {
          paddingTop:
            Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        },
      ]}
    >
      <StatusBar translucent backgroundColor="#E9E9E9" barStyle="dark-content" />

      {/* ===== TOPO ===== */}
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/iconePerfil.png')}
          style={styles.profileIcon}
          resizeMode="contain"
        />

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Image
              source={require('../assets/iconeGato.png')}
              style={styles.statIcon}
            />
            <Text style={styles.statText}>7</Text>
          </View>

          <View style={styles.statItem}>
            <Image
              source={require('../assets/iconePatinha.png')}
              style={styles.statIcon}
            />
            <Text style={styles.statText}>700</Text>
          </View>

          <View style={styles.statItem}>
            <Image
              source={require('../assets/iconeXp.png')}
              style={styles.statIcon}
            />
            <Text style={styles.statText}>1200</Text>
          </View>
        </View>
      </View>

      {/* ===== CONTEÚDO ===== */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={require('../assets/Gatinho.png')}
          style={{ width: 150, height: 100, alignSelf: 'center' }}
          resizeMode="contain"
        />

        {/* 👉 CASO NÃO HAJA TAREFAS */}
        {tarefas.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Não há tarefas disponíveis 🐾
            </Text>
          </View>
        ) : (
          /* 👉 CASO HAJA TAREFAS */
          <View style={styles.zigzagContainer}>
            {tarefas.map((tarefa, index) => {
              const isLeft = index % 2 === 0;

              return (
                <TouchableOpacity
                  key={tarefa._id}
                  style={[
                    styles.patinhaWrapper,
                    {
                      alignSelf: isLeft ? 'flex-start' : 'flex-end',
                      marginLeft: isLeft ? 40 : 0,
                      marginRight: isLeft ? 0 : 40,
                    },
                  ]}
                  onPress={() =>
                    navigation.navigate('Tarefa', {
                      tema: temas[index % temas.length],
                      tarefaId: tarefa._id,
                    })
                  }
                >
                  <Image
                    source={require('../assets/patinha.png')}
                    style={styles.patinha}
                    resizeMode="contain"
                  />

                  <Text style={styles.patinhaText}>
                    {tarefa.titulo || `Tarefa ${index + 1}`}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* ===== RODAPÉ ===== */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Rodapé</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

// ===== ESTILOS =====
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#E9E9E9',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  profileIcon: {
    width: 60,
    height: 60,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },

  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  statIcon: {
    width: 28,
    height: 28,
  },

  statText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  zigzagContainer: {
    flexDirection: 'column',
  },

  patinhaWrapper: {
    marginVertical: 30,
    alignItems: 'center',
  },

  patinha: {
    width: 90,
    height: 90,
  },

  patinhaText: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4226bdff',
    textAlign: 'center',
  },

  emptyContainer: {
    marginTop: 60,
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },

  footer: {
    backgroundColor: '#E9E9E9',
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },

  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
