import {Alert} from 'react-native';
import localRepository from '../integrations/repositories/localRepository';
import {UserAccount} from '../entities/user';
// import userDbTable from '../integrations/database/userDbTable';

const getCurrentUser = async (): Promise<UserAccount> => {
  return await localRepository.getData('current_user').catch(error => {
    console.error(error.message);
  });
};

const updateUser = async (user: UserAccount | null) => {
  await localRepository.storeData('current_user', user).catch(error => {
    console.error(error.message);
  });
};

// const updateUserPicture = async (userPicture: string) => {
//   const user = await getCurrentUser();
//   user.profilePictureURL = userPicture;

//   // TODO: uploade image to assets and asing new url from here.
//   // TODO: then update remote user storage

//   await storeData('current_user', user).catch(error => {
//     console.log(error.message);
//   });

//   await userDbTable.updateUser(user).catch(error => {
//     console.log(error.message);
//   });
// };

// const updateUserTheme = async (theme: string) => {
//   const user = await getCurrentUser();
//   user.theme = theme;

//   await storeData('current_user', user).catch(error => {
//     console.log(error.message);
//   });

//   await userDbTable.updateUser(user).catch(error => {
//     console.log(error.message);
//   });
// };

// const updateUserLanguage = async (language: string) => {
//   const user = await getCurrentUser();
//   user.language = language;

//   await storeData('current_user', user).catch(error => {
//     console.log(error.message);
//   });

//   await userDbTable.updateUser(user).catch(error => {
//     console.log(error.message);
//   });
// };

const deleteUser = async () => {
  await localRepository.removeData('current_user').catch(error => {
    console.error(error.message);
  });
};

const userService = {
  getCurrentUser,
  updateUser,
  // updateUserPicture,
  // updateUserTheme,
  // updateUserLanguage,
  deleteUser,
};

export default userService;
