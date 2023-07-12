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

  // Modal Picker
  modalContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: '#F0F8FF',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 25,
      height: 25,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  textView: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#31728D',
    letterSpacing: 0.3,
    marginTop: 7,
  },

  iconView: {
    fontSize: 18,
    color: '#31728D',
    paddingRight: 10
  },

  walletContainer: {
    justifyContent: 'space-between',
    marginVertical: 5,
  },

  wallet: {
    alignSelf: 'center',
    width: '70%',
    marginTop: 10,
  },

  bgContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#05375a',
    width: '48%',
    paddingVertical: 2,
  },

  optionText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#008CDD',
  },

});

export default styles;
