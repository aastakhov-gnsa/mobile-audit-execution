import EncryptedStorage from 'react-native-encrypted-storage';

/**
 * Keys for items in encrypted storage
 */
export enum SecretItems {
  accessToken = 'accessToken',
  idToken = 'idToken',
}

/**
 * Set a secret to encrypted-storage
 * @param key
 * @param value
 */
async function saveSecret(key: SecretItems, value: string) {
  try {
    await EncryptedStorage.setItem(key, value);
  } catch (error) {
    console.error(
      'Error during setItem to encrypted-storage on native side: ',
      error,
    );
  }
}

/**
 * Get a secret from encrypted-storage
 * @param key
 */
async function getSecret(key: SecretItems) {
  try {
    return await EncryptedStorage.getItem(key);
  } catch (error) {
    console.error(
      'Error during getItem to encrypted-storage on native side: ',
      error,
    );
  }
}

/**
 * Remove item from encrypted-storage
 * @param key
 */
async function removeSecret(key: SecretItems) {
  try {
    await EncryptedStorage.removeItem(key);
  } catch (e) {
    console.error(`Error while removing ${key} secret`, e);
  }
}

async function clearSecrets() {
  try {
    await EncryptedStorage.clear();
  } catch (e) {
    console.error('Error during clearing storage of secrets', e);
  }
}
export const Secrets = {
  saveSecret,
  getSecret,
  removeSecret,
  clearSecrets,
};
