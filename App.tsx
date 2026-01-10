  import React, { useEffect, useState } from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { View, StyleSheet, Text } from 'react-native';

  import api from "./src/api";

  import HomeScreen from './screens/HomeScreen';
  import SecondScreen from './screens/SecondScreen';
  import Estatistica from './screens/Estatistica';
  import TelaCarregamento from './screens/TelaCarregamento';
  import EditarPerfil from './screens/EditarPerfil';
  import Tarefa from './screens/Tarefa';
  import Finalizacao from './screens/Finalizacao';


  import type { RootStackParamList, RootTabParamList } from './src/types';

  // Tipagem aplicada aqui
  const Tab = createBottomTabNavigator<RootTabParamList>();
  const Stack = createNativeStackNavigator<RootStackParamList>();

  const PlaceholderScreen = ({ title }: { title: string }) => (
    <View style={styles.screenPlaceholder}>
      <Text>{title}</Text>
    </View>
  );

  const Tabs = () => {
    const tabOptions = {
      tabBarIcon: () => <View style={styles.circle} />,
    };

    return (
      <Tab.Navigator id={undefined}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#E9E9E9',
            height: 70,
            paddingBottom: 10,
            borderTopWidth: 0,
            elevation: 0,
          },
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={tabOptions} />
        <Tab.Screen name="Second" component={SecondScreen} options={tabOptions} />
        <Tab.Screen name="Third" component={Estatistica} options={tabOptions} />
        <Tab.Screen
          name="Fourth"
          children={() => <PlaceholderScreen title="Quarta Tela" />}
          options={tabOptions}
        />
      </Tab.Navigator>
    );
  };

  const App = () => {
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
      const iniciarApp = async () => {
        try {
          const token = await AsyncStorage.getItem('userToken');
        } catch (e) {
          console.error('Erro ao verificar o login:', e);
        } finally {
          setTimeout(() => setCarregando(false), 2000);
        }
      };

      iniciarApp();
    }, []);

    if (carregando) return <TelaCarregamento />;

    return (
      <NavigationContainer>
        <Stack.Navigator  id={undefined} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
          <Stack.Screen name="Tarefa" component={Tarefa} />
        <Stack.Screen name="Finalizacao" component={Finalizacao} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  const styles = StyleSheet.create({
    circle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: 'white',
      marginBottom: 5,
    },
    screenPlaceholder: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ddd',
    },
  });

  export default App;
