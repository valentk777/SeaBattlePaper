import firestore from '@react-native-firebase/firestore';
import {AppResponse} from '../../../entities/appResponse';
import {UserAccount} from '../../../entities/user';
import timeService from '../../../services/timeService';
import {Alert} from 'react-native';

export const usersRef = firestore().collection('users');

export const addNewUser = async (user: UserAccount) => {
  const dataWithOnlineStatus = {
    ...user,
    lastOnlineTimestamp: timeService.getCurrentDateString(),
  };

  try {
    await usersRef.doc(user.id).set(dataWithOnlineStatus, {merge: true});
    return {isSuccessfull: true, result: dataWithOnlineStatus} as AppResponse;
  } catch (error) {
    console.error(error);
    return {isSuccessfull: false, error: error} as AppResponse;
  }
};

export const updateUser = async (user: UserAccount) => {
  const dataWithOnlineStatus = {
    ...user,
    lastOnlineTimestamp: timeService.getCurrentDateString(),
  };

  try {
    await usersRef.doc(user.id).update(dataWithOnlineStatus);

    return {isSuccessfull: true} as AppResponse;
  } catch (error) {
    console.error(error);

    return {isSuccessfull: false, error: error} as AppResponse;
  }
};

export const getUserByID = async (userID: string) => {
  try {
    const document = await usersRef.doc(userID).get();

    if (document?.exists) {
      return document.data() as UserAccount;
    }

    return null;
  } catch (error) {
    console.error('getUserByID', error);
    return null;
  }
};

export const updateProfilePhoto = async (
  userID: string,
  profilePictureURL: string,
) => {
  try {
    await usersRef.doc(userID).update({profilePictureURL: profilePictureURL});
    return {success: true};
  } catch (error) {
    console.error(error);
    return {error: error};
  }
};

const userDbTable = {
  addNewUser,
  updateUser,
  getUserByID,
  updateProfilePhoto,
};

export default userDbTable;
