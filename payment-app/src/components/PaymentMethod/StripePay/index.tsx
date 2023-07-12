import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';

const StripePay = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.titleText}>Stripe</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StripePay;
