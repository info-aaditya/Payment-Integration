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
    const successCallbackUrl = 'https://example.com/payment/success';
    const failureCallbackUrl = 'https://example.com/payment/failure';

    if (navState.url === successCallbackUrl) {

      // Handle successful payment
      const urlParams = new URLSearchParams(navState.url);
      const pidx = urlParams.get('pidx');
      const transactionId = urlParams.get('transaction_id');
      const amount = urlParams.get('amount');
      const mobile = urlParams.get('mobile');
      const purchaseOrderId = urlParams.get('purchase_order_id');
      const purchaseOrderName = urlParams.get('purchase_order_name');

      // Perform additional processing or update UI based on the payment success

      // Show a success message with transaction details
      const successMessage = `Payment Successful!
        Transaction ID: ${transactionId}
        Amount: ${amount} paisa
        Mobile: ${mobile}
        Purchase Order ID: ${purchaseOrderId}
        Purchase Order Name: ${purchaseOrderName}`;

      Alert.alert('Payment Success', successMessage);

      verifyPayment(pidx); // Perform payment verification for lookup

      // Additional actions or state updates can be performed here
    } else if (navState.url === failureCallbackUrl) {
      Alert.alert('Payment Failed',
        'Sorry, the payment could not be processed.'
      );
    }
  };

  // Payment Verification
  const verifyPayment = async (pidx) => {
    try {
      const payload = { pidx };

      const response = await axios.post(
        'https://a.khalti.com/api/v2/epayment/lookup/',
        payload,
        {
          headers: {
            'Authorization': `Key ${khaltiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const { status, transaction_id, total_amount, refunded } = response.data;

      // Perform actions based on the payment status
      if (status === 'Completed') {
        Alert.alert('Congratulations! • 🚀 -💡',
          '\n Payment is completed!!'
        );
      } else if (status === 'Pending') {
        Alert.alert('Pending! • ⏳ -💡',
          '\n Payment is awaiting confirmation!'
        );
      } else if (status === 'Refunded') {
        Alert.alert('Refunded! • 🚩 -💡',
          '\n Payment refund in progress!'
        );
      }

      // Additional actions or state updates can be performed here
    } catch (error) {
      Alert.alert('Error',
        '\n An error occurred while verifying the payment.'
      );
      console.error(error);
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
