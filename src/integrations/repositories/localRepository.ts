import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const getData = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);

    if (data) {
      return JSON.parse(data);
    }

    return null;
  } catch (exception) {
    console.error('Error getting data from storage');

    if (exception instanceof Error) {
      console.error('Error getting data from storage', exception.message);
    } else {
      console.error('Unexpected error', exception);
    }

    return null;
  }
};

export const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);

    await AsyncStorage.setItem(key, jsonValue);

    return true;
  } catch (exception) {
    console.error('Error saving to storage');

    if (exception instanceof Error) {
      console.error('Error saving to storage', exception.message);
    } else {
      console.error('Unexpected error', exception);
    }

    return false;
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);

    return true;
  } catch (exception) {
    console.error('Error deleting item from storage');

    if (exception instanceof Error) {
      console.error('Error deleting item from storage', exception.message);
    } else {
      console.error('Unexpected error', exception);
    }

    return false;
  }
};

const localRepository = {
  getData,
  storeData,
  removeData,
};

export default localRepository;
