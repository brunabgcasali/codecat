import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SecondScreen() {
  const navigation = useNavigation<any>(); // Tipagem flexível

  return (
    <View style={styles.container}>
      {/* Botão de editar */}
      <TouchableOpacity
        onPress={() => navigation.navigate('EditarPerfil')}
        style={styles.editButton}
      >
        <Text style={styles.editText}>✎ Editar Perfil</Text>
      </TouchableOpacity>

      {/* Avatar */}
      <View style={styles.avatar} />

      {/* Nome e sobrenome */}
      <Text style={styles.nome}>Bruna Guimarães</Text>

      {/* Email */}
      <Text style={styles.label}>E-mail</Text>
      <Text style={styles.valor}>bruna@example.com</Text>

      {/* Data de início */}
      <Text style={styles.label}>Data de início</Text>
      <Text style={styles.valor}>04/08/2025</Text>

      {/* Retângulo com ícone e textos */}
      <View style={styles.card}>
        <View style={styles.cardCircle} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>Curso TADS</Text>
          <Text style={styles.cardSubtitle}>Instituto Federal do Paraná</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  editButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#4a90e2',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  editText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
  },
  valor: {
    fontSize: 16,
    marginBottom: 8,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  cardCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4a90e2',
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});
