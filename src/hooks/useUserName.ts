import React, {useState, useEffect} from 'react'
import { Storage, StorageItems } from '../utils/storage/storage';

/**
 * No idea why we don't store it in redux store
 */
export function useUserName() {
    const [fullName, setFullName] = useState('');
    useEffect(() => {
      const r = async () => {
        if (!fullName) {
          setFullName((await Storage.getItem(StorageItems.fullName)) as string);
        }
      };
      r();
    }, [fullName])
    return fullName
}
