import { View, Text, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

const EsewaPay = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      {/* eSewa Modal WebView  */}
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
          <Text>eSewa Web</Text>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.container}
      >
        <MaterialCommunityIcons
          name="wallet-giftcard"
          style={styles.iconView} 
        />
        <Text style={styles.titleText}>eSewa Wallet</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EsewaPay;
