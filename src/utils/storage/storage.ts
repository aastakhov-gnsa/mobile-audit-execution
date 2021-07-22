import AsyncStorage from '@react-native-async-storage/async-storage';

export enum StorageItems {
  userName = 'userName',
  firstName = 'firstName',
  lastName = 'lastName',
  fullName = 'fullName',
}

async function saveItem(key: StorageItems, value: string) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(`Error during saving ${key}:`, e);
  }
}

async function getItem(key: StorageItems) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error(`Error during retrieving ${key}:`, e);
  }
}

async function deleteItem(key: StorageItems) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(`Error during removing ${key}:`, e);
  }
}
async function setMultiple(keyValuePairs: Array<[StorageItems, string]>) {
  try {
    await AsyncStorage.multiSet(keyValuePairs);
  } catch (e) {
    console.error('Error during saving multiple values', e);
  }
}
export const Storage = {
  saveItem,
  getItem,
  deleteItem,
  setMultiple,
};
