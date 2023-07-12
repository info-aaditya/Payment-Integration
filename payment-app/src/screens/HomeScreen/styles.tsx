import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    backgroundColor: '#f3f3f3',
    borderBottomWidth: 0.5,
    borderBottomColor: '#05375a',
    paddingVertical: 8,
    alignItems: 'center',
  },

  headerText: {
    fontSize: 25,
    letterSpacing: 0.5,
    fontWeight: 'bold',
    color: '#05375a',
  },

  bgContainer: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
  },

});

export default styles;
