// CustomDropdown.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
} from 'react-native';
import { ZodiacSign } from '../store/slices/zodiac_slice';



const zodiacSigns: ZodiacSign[] = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces',
];

type Props = {
  selectedSign: ZodiacSign;
  onSelect: (sign: ZodiacSign) => void;
};

const CustomDropdown = ({ selectedSign, onSelect }: Props) => {
  const [visible, setVisible] = useState(false);

  const renderItem = ({ item }: { item: ZodiacSign }) => {
    const isSelected = item === selectedSign;
    return (
      <TouchableOpacity
        style={[styles.dropdownItem, isSelected && styles.selectedItem]}
        onPress={() => {
          onSelect(item);
          setVisible(false);
        }}
        activeOpacity={0.7}
      >
        <Text style={[styles.dropdownItemText, isSelected && styles.selectedItemText]}>
          {item.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
        accessibilityLabel="Select Zodiac Sign"
        accessibilityHint="Opens dropdown menu"
      >
        <Text style={styles.dropdownButtonText}>{selectedSign.toUpperCase()}</Text>
      </TouchableOpacity>

      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownList}>
              <FlatList
                data={zodiacSigns}
                keyExtractor={(item) => item}
                renderItem={renderItem}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  dropdownButtonText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  dropdownList: {
    backgroundColor: '#000',
    borderRadius: 12,
    maxHeight: 300,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#FFD700',
    ...Platform.select({
      ios: {
        shadowColor: '#FFD700',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
      },
      android: {
        elevation: 15,
      },
    }),
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownItemText: {
    color: '#FFD700',
    fontSize: 18,
  },
  selectedItem: {
    backgroundColor: '#FFD700',
  },
  selectedItemText: {
    color: '#000',
    fontWeight: '900',
  },
});

export default CustomDropdown;
