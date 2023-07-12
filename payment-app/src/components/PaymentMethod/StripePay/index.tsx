import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useStripe } from '@stripe/stripe-react-native';
import { API_URL } from '../../../config';
import styles from './styles';

const StripePay = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async (amount) => {
    try {
      const response = await fetch(`${API_URL}/payment-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch payment sheet parameters');
      }
      const { paymentIntent, ephemeralKey, customer } = await response.json();

      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    } catch (error) {
      console.error('Error fetching payment sheet parameters:', error);
      throw error;
    }
  };

  const initializePaymentSheet = async (amount) => {
    try {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
      } = await fetchPaymentSheetParams(amount);

      const { error } = await initPaymentSheet({
        merchantDisplayName: 'BARPA IT Solution',
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true, // Set it true if your business can handle payment methods that complete payment after a delay, like SEPA Debit and Sofort.
        defaultBillingDetails: {
          name: 'Aaditya',
        },
      });
      if (!error) {
        setLoading(true);
      } else {
        throw new Error('Failed to initialize payment sheet');
      }
    } catch (error) {
      console.error('Error initializing payment sheet:', error);
      throw error;
    }
  };

  const openPaymentSheet = async () => {
    try {
      const { error } = await presentPaymentSheet();

      if (error) {
        Alert.alert(`${error.code} \n `,
          error.message
        );
      } else {
        Alert.alert('Congratulations! • 🚀 -💡',
          '\n Your order is confirmed! Check your mail for the receipt.'
        );
      }
    } catch (error) {
      console.error('Error opening payment sheet:', error);
      Alert.alert('Sorry',
        'An error occurred while processing the payment. Please try again.'
      );
    }
  };

  useEffect(() => {
    const amount = 1099; // Set the dynamic amount here
    initializePaymentSheet(amount).catch((error) => {
      Alert.alert('Error',
        'An error occurred while processing the payment. Please try again.'
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={openPaymentSheet}
        disabled={!loading}
      >
        <Text style={styles.titleText}>Stripe</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StripePay;
