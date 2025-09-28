// HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';
import CustomDropdown from '../../components/drop_down_widget';
import { setSelectedSign, ZodiacSign } from '../../store/slices/zodiac_slice';
import { fetchHoroscope } from '../../utils/horoscope_api';
import { RootState } from '../../store/store';
import styles from './home_screen_styles';


type HomeScreenProps = {
  navigation: NativeStackNavigationProp<any, 'HomeProp'>;
  route: RouteProp<any, 'HomeProp'>;
};



const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const dispatch = useDispatch();
  const selectedSign = useSelector((state: RootState) => state.zodiac.selectedSign) as ZodiacSign;
  const [horoscope, setHoroscope] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchHoroscope(selectedSign).then((result) => {
      setHoroscope(result);
      setLoading(false);
    });
  }, [selectedSign]);

    return (
    <View style={styles.background}>
      {/* Remove overlay if not using image */}
      {/* <View style={styles.overlay} /> */}

      <View style={styles.container}>
        <Text style={styles.title}>Astro Journal</Text>

        <View style={styles.pickerCard}>
          <Text style={styles.label}>Choose your Zodiac Sign</Text>
          <CustomDropdown
            selectedSign={selectedSign}
            onSelect={(sign) => dispatch(setSelectedSign(sign))}
          />
        </View>

        <View style={styles.horoscopeCard}>
          <Text style={styles.horoscopeTitle}>Today's Horoscope</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 20 }} />
          ) : (
            <ScrollView style={{ maxHeight: 160 }} showsVerticalScrollIndicator={false}>
              <Text style={styles.horoscopeText}>{horoscope}</Text>
            </ScrollView>
          )}
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            title="Go to Journal"
            color="#000" // changed text color for contrast with gold background
            onPress={() => navigation.navigate('JournalScreenProp')}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;



// THis Ui IS Recmmenedded


// import React, { useEffect, useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Platform,
//   Animated,
//   Easing,
//   Dimensions,
// } from 'react-native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RouteProp } from '@react-navigation/core';
// import { RootNavigationStack } from '../../navigation/app_routes';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSelectedSign, type ZodiacSign } from '../../store/slices/zodiac_slice';
// import { fetchHoroscope } from '../../utils/horoscope_api';
// import { RootState } from '../../store/store';

// type HomeScreenProps = {
//   navigation: NativeStackNavigationProp<RootNavigationStack, 'HomeProp'>;
//   route: RouteProp<RootNavigationStack, 'HomeProp'>;
// };

// const zodiacData: { sign: ZodiacSign; emoji: string }[] = [
//   { sign: 'aries', emoji: '♈️' },
//   { sign: 'taurus', emoji: '♉️' },
//   { sign: 'gemini', emoji: '♊️' },
//   { sign: 'cancer', emoji: '♋️' },
//   { sign: 'leo', emoji: '♌️' },
//   { sign: 'virgo', emoji: '♍️' },
//   { sign: 'libra', emoji: '♎️' },
//   { sign: 'scorpio', emoji: '♏️' },
//   { sign: 'sagittarius', emoji: '♐️' },
//   { sign: 'capricorn', emoji: '♑️' },
//   { sign: 'aquarius', emoji: '♒️' },
//   { sign: 'pisces', emoji: '♓️' },
// ];

// const windowWidth = Dimensions.get('window').width;

// const HomeScreen = ({ navigation }: HomeScreenProps) => {
//   const dispatch = useDispatch();
//   const selectedSign = useSelector((state: RootState) => state.zodiac.selectedSign) as ZodiacSign;
//   const [horoscope, setHoroscope] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(true);

//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     setLoading(true);
//     fetchHoroscope(selectedSign).then((result) => {
//       setHoroscope(result);
//       setLoading(false);
//       Animated.sequence([
//         Animated.timing(fadeAnim, {
//           toValue: 1,
//           duration: 600,
//           easing: Easing.out(Easing.ease),
//           useNativeDriver: true,
//         }),
//         Animated.delay(2000),
//         Animated.timing(fadeAnim, {
//           toValue: 1, // keep visible
//           duration: 500,
//           useNativeDriver: true,
//         }),
//       ]).start();
//     });
//   }, [selectedSign]);

//   const onPressIn = () => {
//     Animated.spring(scaleAnim, {
//       toValue: 0.9,
//       useNativeDriver: true,
//       friction: 3,
//       tension: 40,
//     }).start();
//   };

//   const onPressOut = () => {
//     Animated.spring(scaleAnim, {
//       toValue: 1,
//       useNativeDriver: true,
//       friction: 3,
//       tension: 40,
//     }).start();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Astro Journal</Text>

//       <Text style={styles.subHeader}>Select your Zodiac Sign</Text>

//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContainer}
//       >
//         {zodiacData.map(({ sign, emoji }) => {
//           const isSelected = selectedSign === sign;
//           return (
//             <TouchableOpacity
//               key={sign}
//               onPress={() => dispatch(setSelectedSign(sign))}
//               activeOpacity={0.8}
//               style={[styles.signButton, isSelected && styles.signButtonSelected]}
//               onPressIn={onPressIn}
//               onPressOut={onPressOut}
//               accessibilityRole="button"
//               accessibilityState={{ selected: isSelected }}
//             >
//               <Text style={[styles.signEmoji, isSelected && styles.signEmojiSelected]}>{emoji}</Text>
//               <Text style={[styles.signLabel, isSelected && styles.signLabelSelected]}>{sign.toUpperCase()}</Text>
//               {isSelected && <View style={styles.glow} />}
//             </TouchableOpacity>
//           );
//         })}
//       </ScrollView>

//       <Animated.View style={[styles.horoscopeCard, { opacity: fadeAnim }]}>
//         {loading ? (
//           <ActivityIndicator size="large" color="#FFD700" />
//         ) : (
//           <>
//             <Text style={styles.horoscopeTitle}>Today's Horoscope for {selectedSign.toUpperCase()}</Text>
//             <Text style={styles.horoscopeText}>{horoscope}</Text>
//           </>
//         )}
//       </Animated.View>

//       <TouchableOpacity
//         style={[styles.journalButton, { transform: [{ scale: scaleAnim }] }]}
//         activeOpacity={0.8}
//         onPress={() => navigation.navigate('JournelScreenProp')}
//       >
//         <Text style={styles.journalButtonText}>Go to Journal</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0F0E17',
//     paddingTop: Platform.OS === 'android' ? 50 : 80,
//     paddingHorizontal: 16,
//     justifyContent: 'flex-start',
//   },
//   header: {
//     fontSize: 40,
//     fontWeight: '900',
//     color: '#FFD700',
//     textAlign: 'center',
//     marginBottom: 20,
//     letterSpacing: 3,
//     textShadowColor: '#000000AA',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 8,
//   },
//   subHeader: {
//     fontSize: 20,
//     color: '#FFD700',
//     marginBottom: 14,
//     textAlign: 'center',
//     fontWeight: '600',
//   },
//   scrollContainer: {
//     paddingHorizontal: 10,
//     paddingBottom: 30,
//     justifyContent: 'center',
//   },
//   signButton: {
//     width: 100,
//     height: 120,
//     borderRadius: 20,
//     backgroundColor: '#1A1A2E',
//     marginHorizontal: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'relative',
//     shadowColor: '#00000088',
//     shadowOffset: { width: 0, height: 5 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   signButtonSelected: {
//     backgroundColor: '#FFD700',
//   },
//   glow: {
//     position: 'absolute',
//     top: -10,
//     left: -10,
//     right: -10,
//     bottom: -10,
//     borderRadius: 30,
//     borderColor: '#FFD700',
//     borderWidth: 2,
//     shadowColor: '#FFD700',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.9,
//     shadowRadius: 15,
//     elevation: 15,
//   },
//   signEmoji: {
//     fontSize: 44,
//     marginBottom: 8,
//     color: '#FFD700',
//   },
//   signEmojiSelected: {
//     color: '#1A1A2E',
//   },
//   signLabel: {
//     color: '#FFD700',
//     fontWeight: '700',
//     fontSize: 16,
//   },
//   signLabelSelected: {
//     color: '#1A1A2E',
//   },
//   horoscopeCard: {
//     flex: 1,
//     backgroundColor: '#1A1A2E',
//     borderRadius: 24,
//     padding: 28,
//     marginTop: 10,
//     shadowColor: '#FFD700',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.25,
//     shadowRadius: 20,
//     elevation: 12,
//     minHeight: 220,
//     justifyContent: 'center',
//   },
//   horoscopeTitle: {
//     fontSize: 24,
//     fontWeight: '800',
//     color: '#FFD700',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   horoscopeText: {
//     fontSize: 18,
//     color: '#FFF9C4',
//     lineHeight: 28,
//     fontStyle: 'italic',
//     textAlign: 'center',
//     letterSpacing: 0.4,
//   },
//   journalButton: {
//     backgroundColor: '#FFD700',
//     paddingVertical: 16,
//     borderRadius: 32,
//     marginVertical: 28,
//     marginHorizontal: 50,
//     shadowColor: '#FFD700',
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.85,
//     shadowRadius: 12,
//     elevation: 14,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   journalButtonText: {
//     color: '#1A1A2E',
//     fontSize: 20,
//     fontWeight: '900',
//     letterSpacing: 1,
//   },
// });

// export default HomeScreen;
