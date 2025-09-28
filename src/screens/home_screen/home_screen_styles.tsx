// styles.ts (updated)
import { StyleSheet, Platform } from 'react-native';

const sharedStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#000000', // solid black background
    justifyContent: 'center',
  },
  overlay: {
  
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 44,
    fontWeight: '900',
    color: '#FFD700', 
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif', 
    letterSpacing: 2,
    textShadowColor: '#FFD700',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
  pickerCard: {
    backgroundColor: '#111111', 
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 30,
    ...Platform.select({
      ios: {
        shadowColor: '#FFD700',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  label: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  horoscopeCard: {
    backgroundColor: '#111111',
    borderRadius: 16,
    padding: 25,
    minHeight: 180,
    ...Platform.select({
      ios: {
        shadowColor: '#FFD700',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 15,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  horoscopeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFD700',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  horoscopeText: {
    fontSize: 16,
    lineHeight: 26,
    color: '#FFFACD',
    fontStyle: 'italic',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
  },
  buttonWrapper: {
    marginTop: 40,
    width: '60%',
    alignSelf: 'center',
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 10,
  },
});

export default sharedStyles;
