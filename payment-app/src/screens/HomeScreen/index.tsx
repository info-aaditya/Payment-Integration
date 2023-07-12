import { View, Text, ImageBackground } from 'react-native';
import React from 'react';
import bgImage from '../../assets/images/background.jpg';
import styles from './styles';

const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Payment Method</Text>
      </View>

      <ImageBackground
        source={bgImage}
        style={styles.bgContainer}
      >
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
