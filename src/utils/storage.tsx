// src/utils/journalStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const JOURNAL_KEY = (sign: string, date: string) => `journal_${sign}_${date}`;

export async function saveJournalEntry(sign: string, date: string, entry: string) {
  try {
    const key = JOURNAL_KEY(sign, date);
    await AsyncStorage.setItem(key, entry);
  } catch (error) {
    console.error('Error saving journal entry:', error);
  }
}

export async function loadJournalEntry(sign: string, date: string): Promise<string> {
  try {
    const key = JOURNAL_KEY(sign, date);
    const val = await AsyncStorage.getItem(key);
    return val || '';
  } catch (error) {
    console.error('Error loading journal entry:', error);
    return '';
  }
}
