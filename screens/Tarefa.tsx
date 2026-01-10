import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';

import { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList, BancoQuestoes, Questao } from '../src/types';
import questoesJson from '../data/questoes.json';

// Tipagem da rota
type TarefaScreenRouteProp = RouteProp<RootStackParamList, 'Tarefa'>;

// Tipagem da navegação
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Tarefa'>;

type Props = {
  route: TarefaScreenRouteProp;
  navigation: NavigationProp;
};

const TEMPO_POR_QUESTAO = 10; // segundos

const Tarefa = ({ route, navigation }: Props) => {
  const bancoQuestoes: BancoQuestoes = questoesJson;

  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [indiceQuestao, setIndiceQuestao] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(TEMPO_POR_QUESTAO);

  useEffect(() => {
    const tema = route.params?.tema || 'geografia'; // padrão
    const questoesTema = bancoQuestoes[tema];

    if (questoesTema && questoesTema.length > 0) {
      setQuestoes(questoesTema);
    } else {
      Alert.alert('Erro', 'Nenhuma questão encontrada para o tema selecionado.');
      navigation.goBack();
    }
  }, [route.params, bancoQuestoes, navigation]);

  const questaoAtual = questoes.length > 0 ? questoes[indiceQuestao] : null;

  const handleSair = () => {
    Alert.alert('Sair', 'Deseja sair do quiz?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sim', onPress: () => navigation.goBack() },
    ]);
  };

  const progresso = questoes.length > 0 ? ((indiceQuestao + 1) / questoes.length) * 100 : 0;

  if (!questaoAtual) {
    return (
      <View style={styles.container}>
        <Text>Carregando questões...</Text>
      </View>
    );
  }

  const handleEnviar = () => {
    if (respostaSelecionada === null || !questaoAtual) return;

    const acertou = respostaSelecionada === questaoAtual.correta;
    const novoAcertos = acertou ? acertos + 1 : acertos;
    const proximaQuestao = indiceQuestao + 1;

    if (proximaQuestao < questoes.length) {
      setIndiceQuestao(proximaQuestao);
      setRespostaSelecionada(null);
      setTempoRestante(TEMPO_POR_QUESTAO);
      setAcertos(novoAcertos);
    } else {
      navigation.navigate('Finalizacao', {
        totalQuestoes: questoes.length,
        acertos: novoAcertos,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Barra superior */}
      <View style={styles.topBar}>
        <Pressable onPress={handleSair}>
          <Text style={styles.exitText}>✖</Text>
        </Pressable>
        <Text style={styles.timerText}>⏱️ {tempoRestante}s</Text>
      </View>

      {/* Barra de progresso */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progresso}%` }]} />
      </View>

      {/* Pergunta */}
      <Text style={styles.pergunta}>{questaoAtual.pergunta}</Text>

      {/* Alternativas */}
      {questaoAtual.alternativas.map((alternativa, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.botao,
            respostaSelecionada === index && styles.botaoSelecionado,
          ]}
          onPress={() => setRespostaSelecionada(index)}
        >
          <Text style={styles.botaoTexto}>{alternativa}</Text>
        </TouchableOpacity>
      ))}

      {/* Botão enviar */}
      <TouchableOpacity
        style={[
          styles.enviarBotao,
          respostaSelecionada === null && styles.enviarBotaoDesativado,
        ]}
        onPress={handleEnviar}
        disabled={respostaSelecionada === null}
      >
        <Text style={styles.enviarBotaoTexto}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  exitText: { fontSize: 24, color: '#333' },
  timerText: { fontSize: 18, fontWeight: 'bold' },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    marginVertical: 20,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#4caf50',
    borderRadius: 5,
  },
  pergunta: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  botao: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: '#ddd',
  },
  botaoSelecionado: {
    backgroundColor: '#a2d5f2',
  },
  botaoTexto: {
    fontSize: 16,
    textAlign: 'center',
  },
  enviarBotao: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#4caf50',
    borderRadius: 8,
  },
  enviarBotaoDesativado: {
    backgroundColor: '#a5d6a7',
  },
  enviarBotaoTexto: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Tarefa;
