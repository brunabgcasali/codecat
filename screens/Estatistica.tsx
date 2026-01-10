import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function Estatistica() {
  const [tarefas, setTarefas] = useState([]);
  const [nivel, setNivel] = useState(1);
  const [ultimaTarefa, setUltimaTarefa] = useState('');
  const [xp, setXp] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'https://seu-servidor.com/api/progresso/usuarioIdAQUI'; // coloque sua url

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);

        // Supondo que sua API retorne algo assim:
        // {
        //   nivel: 3,
        //   xpAtual: 850,
        //   ultimaTarefa: "Funções",
        //   progressoTemas: [
        //     { id: '1', titulo: 'Variáveis', nivel: 'Fácil', info: '...' },
        //     ...
        //   ]
        // }

        const data = response.data;

        setNivel(data.nivel);
        setXp(data.xpAtual);
        setUltimaTarefa(data.ultimaTarefa || 'Nenhuma');
        setTarefas(data.progressoTemas || []);
      } catch (err) {
        setError('Erro ao carregar dados');
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleInfo = (info) => {
    Alert.alert('Informação', info);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#4a90e2" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Barra superior */}
      <View style={styles.topBar}>
        <Text style={styles.topItem}>Nível: {nivel}</Text>
        <Text style={styles.topItem}>Última: {ultimaTarefa}</Text>
        <Text style={styles.topItem}>XP: {xp}</Text>
      </View>

      {/* Grade de tarefas */}
      <ScrollView contentContainerStyle={styles.grid}>
        {tarefas.map((tarefa, index) => (
          <View
            key={tarefa.id}
            style={[
              styles.card,
              index % 2 === 0 ? styles.leftCard : styles.rightCard,
            ]}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{tarefa.titulo}</Text>
              <TouchableOpacity onPress={() => handleInfo(tarefa.info)}>
                <Text style={styles.infoButton}>?</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.cardSubtitle}>{tarefa.nivel}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  topItem: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  grid: {
    paddingBottom: 100,
  },
  card: {
    width: '45%',
    backgroundColor: '#e0f0ff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
  },
  leftCard: {
    alignSelf: 'flex-start',
  },
  rightCard: {
    alignSelf: 'flex-end',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2a4d69',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
  },
  infoButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a90e2',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    overflow: 'hidden',
  },
});
