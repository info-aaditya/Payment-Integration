import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import styles from './styles';

const KhaltiPay = () => {
  const khaltiKey = 'khaltiKey'; // Khalti Key is required
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);

  // Initiating a Payment request
  const initiatePayment = async () => {
    if (loading) {
      return;
    }
  
    setLoading(true);

    try {
      const payload = {
        return_url: 'https://example.com/payment/',
        website_url: 'https://example.com/',
        amount: 1300,
        purchase_order_id: 'test12',
        purchase_order_name: 'test_plan',
        customer_info: {
          name: 'Someone',
          email: 'someone@gmail.com',
          phone: '9810203040'
        },
        amount_breakdown: [
          {
            label: 'Mark Price',
            amount: 1000
          },
          {
            label: 'VAT',
            amount: 300
          }
        ],
        product_details: [
          {
            identity: '1234567890',
            name: 'App logo',
            total_price: 1300,
            quantity: 1,
            unit_price: 1300
          }
        ]
      };

      const response = await axios.post(
        'https://a.khalti.com/api/v2/epayment/initiate/',
        payload,
        {
          headers: {
            'Authorization': `Key ${khaltiKey}`,
            'Content-Type': 'application/json'
          },
        }
      );

      const { payment_url } = response.data;
      setPaymentUrl(payment_url);
      setVisible(true);
    } catch (error) {
      Alert.alert('Sorry',
        '\n An error occurred while processing the payment. \n\n  Please try again.'
      );
      console.error(error);
    }

    setLoading(false);
  };

  // Payment Success Callback
  const handleNavigation = (navState) => {
    // Handle the navigation state change if needed
    // Check if the payment is completed and close the modal
    if (navState.url === 'https://example.com/payment/success') {
      setVisible(false);
      // Additional processing if required
    }
  };

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

          <WebView
            source={{
              uri: paymentUrl,
            }}
            onNavigationStateChange={handleNavigation}
          />
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.container}
        onPress={initiatePayment}
        disabled={loading}
      >
        <MaterialCommunityIcons
          name="wallet-giftcard"
          style={styles.iconView}
        />
        <Text style={styles.titleText}>
          {loading ? 'Loading...' : 'Khalti Wallet'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default KhaltiPay;
