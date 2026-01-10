import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../src/types';

type FinalizacaoRouteProp = RouteProp<RootStackParamList, 'Finalizacao'>;
type FinalizacaoNavigationProp = StackNavigationProp<RootStackParamList, 'Finalizacao'>;

type Props = {
  route: FinalizacaoRouteProp;
};

const Finalizacao = ({ route }: Props) => {
  const navigation = useNavigation<FinalizacaoNavigationProp>();
  const { totalQuestoes, acertos } = route.params;

  const percentual = (acertos / totalQuestoes) * 100;

  let mensagem = '';
  let emoji = '';

  if (acertos === totalQuestoes) {
    mensagem = 'Parabéns! Você acertou tudo!';
    emoji = '🏆';
  } else if (percentual > 50) {
    mensagem = 'Muito bem! Você acertou mais da metade.';
    emoji = '👏';
  } else {
    mensagem = 'Continue praticando! Você consegue melhorar.';
    emoji = '💪';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.mensagem}>{mensagem}</Text>
      <Text style={styles.resultado}>
        Acertos: {acertos} de {totalQuestoes} ({Math.round(percentual)}%)
      </Text>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.goBack()}>
        <Text style={styles.botaoTexto}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emoji: { fontSize: 64, marginBottom: 20 },
  mensagem: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  resultado: { fontSize: 18, color: '#555', marginBottom: 30 },
  botao: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Finalizacao;
