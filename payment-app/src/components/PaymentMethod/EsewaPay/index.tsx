import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

const EsewaPay = ({ user, product }) => {
  const [visible, setVisible] = useState(false);
  const [paymentURL, setPaymentURL] = useState('');

  const handlePayment = async () => {
    const paymentURL = 'https://uat.esewa.com.np/epay/main';

    const amt = product.amount;
    const psc = 0;
    const pdc = 0;
    const txAmt = 0;
    const pid = product.productId;
    const scd = 'EPAYTEST';
    const su = 'http://merchant.com.np/page/esewa_payment_success';
    const fu = 'http://merchant.com.np/page/esewa_payment_failed';

    const tAmt = amt + psc + pdc + txAmt;

    const params = { amt, psc, pdc, txAmt, tAmt, pid, scd, su, fu };

    const queryString = Object.keys(params)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

    const finalURL = `${paymentURL}?${queryString}`;

    setPaymentURL(finalURL);
    setVisible(true);
  };

  const handleNavigation = (navState) => {
    const { url } = navState;

    if (url.includes('esewa_payment_success')) {
      Alert.alert('Congratulations! • 🚀 -💡',
        '\n Payment Success, Thank you for your payment!'
      );
      setVisible(false);
    } else if (url.includes('esewa_payment_failed')) {
      Alert.alert('Sorry! • 🚀 -💡',
        '\n Payment Failed, the payment was unsuccessful.'
      );
      setVisible(false);
    }
  };

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
          <WebView 
            source={{
              uri: paymentURL
            }}
            onNavigationStateChange={handleNavigation}
          />
        </View>
      </Modal>

      <TouchableOpacity 
        style={styles.container}
        onPress={handlePayment}
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
