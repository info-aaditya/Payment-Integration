import { View, Text, ImageBackground, Pressable, Modal } from 'react-native';
import React, { useState } from 'react';
import bgImage from '../../assets/images/background.jpg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UserDetails from '../../components/UserDetails';
import EsewaPay from '../../components/PaymentMethod/EsewaPay';
import KhaltiPay from '../../components/PaymentMethod/KhaltiPay';
import StripePay from '../../components/PaymentMethod/StripePay';
import details from '../../assets/data/details';
import styles from './styles';

const HomeScreen = () => {
  const { user, product } = details;
  const [visible, setVisible] = useState(false); 

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Payment Method</Text>
      </View>

      {/* Modal Media */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerHeader}>
            <Text></Text>
            <Text style={styles.textView}>Choose Method</Text>
            <MaterialCommunityIcons
              onPress={() => setVisible(false)}
              name="close-thick"
              style={styles.iconView} 
            />
          </View>

          <View style={styles.walletContainer}>
            <View style={styles.wallet}>
              <EsewaPay/>
            </View>
            <View style={styles.wallet}>
              <KhaltiPay/>
            </View>
          </View>
        </View>
      </Modal>

      <ImageBackground
        source={bgImage}
        resizeMode='cover'
        style={styles.bgContainer}
      >

        {/* Details Container */}
        <View style={styles.detailsContainer}>
          <UserDetails />
        </View>

        {/* Payment Method Options */}
        <View style={styles.optionContainer}>
          <Pressable
            onPress={() => setVisible(!visible)}
            style={styles.buttonContainer}
          >
            <Text style={styles.optionText}>Wallet</Text>
          </Pressable>

          <View style={styles.buttonContainer}>
            <StripePay user={user} product={product} />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
