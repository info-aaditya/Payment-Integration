import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { StripeProvider } from '@stripe/stripe-react-native';

function App(): JSX.Element {

  return (
    <SafeAreaView style={styles.container}>
      <StripeProvider
        publishableKey="publishableKey" //publishableKey is required
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
      >
        <HomeScreen />
      </StripeProvider>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

export default App;
