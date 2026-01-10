import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';



export default function TelaCarregamento() {
  const anim1 = useRef(new Animated.Value(0)).current;
  const anim2 = useRef(new Animated.Value(0)).current;
  const anim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createAnimation = (animatedValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animatedValue, {
            toValue: -10,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      );
    };

    createAnimation(anim1, 0).start();
    createAnimation(anim2, 150).start();
    createAnimation(anim3, 300).start();
  }, []);

  return (
    <View style={styles.container}>


      <View style={{ height: 24 }} />

      <Image
      source={require('../assets/RostoCarregamento.png')} // coloque o caminho correto
      style={styles.imagemGatinho}
      resizeMode="contain"
      />

      <View style={styles.bolinhasContainer}>
        <Animated.View style={[styles.bolinha, { transform: [{ translateY: anim1 }] }]} />
        <Animated.View style={[styles.bolinha, { transform: [{ translateY: anim2 }] }]} />
        <Animated.View style={[styles.bolinha, { transform: [{ translateY: anim3 }] }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imagemGatinho: {
    width: 130, // antes era 200
    height: 130,
  },
  bolinhasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
  },
  bolinha: {
    width: 12,
    height: 12,
    borderRadius: 8,
    backgroundColor: '#A461BA', // cor atualizada
    marginHorizontal: 4,
  },
});
