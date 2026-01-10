import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function EditarPerfil() {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleCadastro = () => {
    if (
      !form.nome ||
      !form.sobrenome ||
      !form.email ||
      !form.senha ||
      !form.confirmarSenha
    ) {
      Alert.alert('Preencha todos os campos!');
      return;
    }

    if (form.senha !== form.confirmarSenha) {
      Alert.alert('As senhas não coincidem!');
      return;
    }

    // Validação concluída, envie os dados (por exemplo, para o Firebase)
    console.log('Dados enviados:', form);
    Alert.alert('Cadastro realizado com sucesso!');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Faixa superior */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.voltar}>← Voltar</Text>
        </TouchableOpacity>

        <View style={styles.bolinha} />

        <Text style={styles.headerText}>Cadastro</Text>
      </View>

      {/* Formulário */}
      <View style={styles.form}>
        <TextInput
          placeholder="Nome"
          style={styles.input}
          value={form.nome}
          onChangeText={(text) => handleChange('nome', text)}
        />
        <TextInput
          placeholder="Sobrenome"
          style={styles.input}
          value={form.sobrenome}
          onChangeText={(text) => handleChange('sobrenome', text)}
        />
        <TextInput
          placeholder="E-mail"
          style={styles.input}
          value={form.email}
          onChangeText={(text) => handleChange('email', text)}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Senha"
          style={styles.input}
          secureTextEntry
          value={form.senha}
          onChangeText={(text) => handleChange('senha', text)}
        />
        <TextInput
          placeholder="Confirmar Senha"
          style={styles.input}
          secureTextEntry
          value={form.confirmarSenha}
          onChangeText={(text) => handleChange('confirmarSenha', text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 100,
    backgroundColor: '#4a90e2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    position: 'relative',
  },
  voltar: {
    color: '#fff',
    fontSize: 16,
  },
  bolinha: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 75, // metade fora da faixa (faixa tem 100 de altura)
    left: 150,
    zIndex: 1,
    borderWidth: 2,
    borderColor: '#4a90e2',
  },
  headerText: {
    marginLeft: 'auto',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 40,
    paddingHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

