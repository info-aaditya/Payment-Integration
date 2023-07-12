import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#C2D0DB',
    padding: 10,
  },

  iconView: {
    fontSize: 23,
    color: '#60bb46',
  },

  titleText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#60bb46',
  },

  modalContainer: {
    flex: 1,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    padding: 10,
  },

});

export default styles;
