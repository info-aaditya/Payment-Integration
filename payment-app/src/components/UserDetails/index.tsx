import React from 'react';
import { View, Text } from 'react-native';
import details from '../../assets/data/details';
import styles from './styles';

const UserDetails = () => {
  const { user, product } = details;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>User & Product Details</Text>
      </View>
      
      <View style={styles.innerContainer}>
        <Text style={styles.titleText}>Name: {user.name}</Text>
        <Text style={styles.titleText}>Username: {user.username}</Text>
        <Text style={styles.titleText}>Email: {user.email}</Text>
        <Text style={styles.titleText}>Phone: {user.phone}</Text>
        <Text style={styles.titleText}>Address: {user.address}</Text>

        <Text style={styles.titleText}>Product Details:</Text>
        <Text style={styles.titleText}>Product ID: {product.productId}</Text>
        <Text style={styles.titleText}>
          Product Name: {product.productName}
        </Text>
        <Text style={styles.titleText}>Amount: {product.amount}</Text>
      </View>
    </View>
  );
};

export default UserDetails;
