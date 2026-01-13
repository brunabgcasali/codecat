// src/types.ts

// Tipo da questão, batendo com o JSON atual
export type Questao = {
  pergunta: string;        // texto da pergunta
  alternativas: string[];   // lista de alternativas
  correta: number;          // índice da alternativa correta
};

// Banco de questões por tema
export type BancoQuestoes = {
  [tema: string]: Questao[];
};

export type RootTabParamList = {
  Home: undefined;
  Second: undefined;
  Third: undefined;
  Fourth: undefined;
};

export type RootStackParamList = {
  Tabs: undefined;
  Home: undefined;
  EditarPerfil: undefined;
  Tarefa: {
    tema: string;
    tarefaId: string;
  };
  Finalizacao: {
    totalQuestoes: number;
    acertos: number;
  };
};
