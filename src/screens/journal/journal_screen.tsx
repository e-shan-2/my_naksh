import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ToastAndroid,
  Alert,
  Animated,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import type { ZodiacSign } from '../../store/slices/zodiac_slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTodayDate } from '../../utils/date_utils';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootNavigationStack } from '../../navigation/app_routes';
import { RouteProp } from '@react-navigation/native';

type JournalEntry = {
  id: string;
  text: string;
  date: string;
};

type JournelScreenProp = {
  navigation: NativeStackNavigationProp<RootNavigationStack, 'JournalScreenProp'>;
  route: RouteProp<RootNavigationStack, 'JournalScreenProp'>;
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const JournalScreen = ({ navigation }: JournelScreenProp) => {
  const selectedSign = useSelector((state: RootState) => state.zodiac.selectedSign) as ZodiacSign;

  const [entryText, setEntryText] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const STORAGE_KEY = `journal_entries_${selectedSign}`;

  const showToast = (msg: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert('Info', msg);
    }
  };

  const loadEntries = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: JournalEntry[] = JSON.parse(stored);
        setEntries(parsed);
      } else {
        setEntries([]);
      }
    } catch (err) {
      console.error('Failed to load entries', err);
    }
  };

  useEffect(() => {
    loadEntries();
    setEntryText('');
    setEditingId(null);
  }, [selectedSign]);

  const handleSave = async () => {
    if (entryText.trim() === '') {
      showToast('Entry is empty');
      return;
    }

    const today = getTodayDate();

    let updatedEntries: JournalEntry[];

    if (editingId) {
      updatedEntries = entries.map(e => (e.id === editingId ? { ...e, text: entryText } : e));
    } else {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        text: entryText,
        date: today,
      };
      updatedEntries = [newEntry, ...entries];
    }

    try {
      setSaving(true);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
      setSaving(false);
      showToast(editingId ? 'Entry updated' : 'Entry saved');
      setEntryText('');
      setEditingId(null);
      setEntries(updatedEntries);
    } catch (err) {
      console.error('Error saving entry', err);
      showToast('Error saving entry');
      setSaving(false);
    }
  };

  // Animation state for button press feedback
  const [buttonScale] = useState(new Animated.Value(1));
  const onPressIn = () => Animated.spring(buttonScale, { toValue: 0.95, useNativeDriver: true }).start();
  const onPressOut = () => Animated.spring(buttonScale, { toValue: 1, friction: 3, useNativeDriver: true }).start();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      {/* App Bar */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.appBarBackButton} activeOpacity={0.7}>
          <Text style={styles.appBarBackButtonText}>{"←"}</Text>
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Journal — {selectedSign.toUpperCase()}</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            multiline
            value={entryText}
            onChangeText={setEntryText}
            placeholder="Write your journal entry..."
            placeholderTextColor="#888"
            selectionColor="#FFCA28"
            underlineColorAndroid="transparent"
          />
        </View>

        <AnimatedTouchable
          style={[styles.saveButton, saving && styles.saveButtonDisabled, { transform: [{ scale: buttonScale }] }]}
          onPress={handleSave}
          disabled={saving}
          activeOpacity={0.8}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <Text style={styles.saveButtonText}>{saving ? 'Saving...' : editingId ? 'Update Entry' : 'Save Entry'}</Text>
        </AnimatedTouchable>

        {entries.length > 0 && (
          <View style={styles.entriesWrapper}>
            <Text style={styles.entriesTitle}>Saved Entries</Text>
            {entries.map((item) => (
              <View key={item.id} style={styles.entryCard}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryDate}>{item.date}</Text>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => {
                      setEntryText(item.text);
                      setEditingId(item.id);
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.entryText}>{item.text}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  appBar: {
    height: 56,
    backgroundColor: '#FFCA28',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },
  appBarBackButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appBarBackButtonText: {
    fontSize: 28,
    color: '#121212',
    fontWeight: '700',
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#121212',
    letterSpacing: 1.2,
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 120,
  },
  inputWrapper: {
    backgroundColor: '#1F1F1F',
    borderRadius: 20,
    padding: 22,
    minHeight: 190,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 7,
  },
  textInput: {
    color: '#E0E0E0',
    fontSize: 18,
    textAlignVertical: 'top',
    minHeight: 160,
    paddingHorizontal: 12,
    paddingTop: 6,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#FFCA28',
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#FFCA28',
    shadowOpacity: 0.65,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  saveButtonDisabled: {
    backgroundColor: '#b5a642',
  },
  saveButtonText: {
    color: '#121212',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  entriesWrapper: {
    marginTop: 10,
  },
  entriesTitle: {
    fontSize: 24,
    color: '#FFCA28',
    fontWeight: '800',
    marginBottom: 20,
    letterSpacing: 0.6,
  },
  entryCard: {
    backgroundColor: '#1F1F1F',
    borderRadius: 22,
    padding: 22,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  entryDate: {
    color: '#FFCA28',
    fontWeight: '700',
    fontSize: 15,
  },
  entryText: {
    color: '#ddd',
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: '#FFCA28',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#FFCA28',
    shadowOpacity: 0.45,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  editButtonText: {
    color: '#121212',
    fontWeight: '800',
    fontSize: 15,
  },
});

export default JournalScreen;
