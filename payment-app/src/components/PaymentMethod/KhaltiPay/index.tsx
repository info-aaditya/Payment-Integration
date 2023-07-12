import { View, Text, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

const KhaltiPay = () => {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      {/* Khalti Modal WebView */}
      <Modal
        visible={visible}
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
          <Text>Khalti Web</Text>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.container}
      >
        <MaterialCommunityIcons
          name="wallet-giftcard"
          style={styles.iconView} 
        />
        <Text style={styles.titleText}>
          Khalti Wallet
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default KhaltiPay;
