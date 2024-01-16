import { Alert } from "react-native";
import { BoardItem } from "../entities/boardItem";
import { getData, storeData } from "./dataStorageService";

const generateNewShipBoard = () => Array.from({ length: 100 }, (_, index) => (
  {
    location: String(index).padStart(2, '0'),
    selected: false,
    fixed: false,
  } as BoardItem
));

const initShipBoard = async (gameId: string) => {
  // const response = await challengesDbTable.getChallenges(userId);
  // let challenges = [] as Challenge[];

  // if (response.isSuccessfull) {
  //   challenges = response.result as Challenge[];
  // }
  const shipBoard = generateNewShipBoard();

  await storeData(getShipBoardKey(gameId), shipBoard);

  return shipBoard;
};

const getShipBoardKey = (gameId: string) => {
  return `board/${gameId}`;
};

const getShipBoard = async (gameId: string) => {
  try {
    // const user = await userService.getCurrentUser();

    // if (gameId === null || gameId === '') {
    //   return [] as Challenge[];
    // }

    const shipBoard = await getData(getShipBoardKey(gameId));

    if (shipBoard === null) {
      return await initShipBoard(gameId);
    }

    return shipBoard as BoardItem[];
  } catch (error) {
    Alert.alert(`Issues getting all board item: Error: ${error}`);
    return [] as BoardItem[];
  }
};

// const getChallengeById = (challenges: Challenge[], challengeId: string) => {
//   if (challenges.length == 0) {
//     return null;
//   }

//   const selectedChallenges = challenges.filter(
//     challenge => challenge.id === challengeId,
//   );

//   if (selectedChallenges.length === 0) {
//     return null;
//   }

//   if (selectedChallenges.length > 1) {
//     Alert.alert('More than one challege with same id found');
//   }

//   return selectedChallenges[0];
// };

const updateShipBoardItem = (shipBoard: BoardItem[], item: BoardItem) => {
  return shipBoard.map(currentItem =>
    currentItem.location === item.location ? item : currentItem,
  );
};

const updateShipBoard = async (gameId: string, shipBoard: BoardItem[], item: BoardItem) => {
  try {
    // const user = await userService.getCurrentUser();

    // if (user === null || user.id === '' || user.id === null) {
    //   console.error('Cannot store challenge because user does not exist');
    //   return false;
    // }

    let shipBoard = await getShipBoard(gameId);

    if (shipBoard != null) {
      shipBoard = updateShipBoardItem(shipBoard, item);
    }

    storeData(getShipBoardKey(gameId), shipBoard);
    // challengesDbTable.updateDbStoredChallenges(user.id, challenges);

    return shipBoard;
  } catch (error) {
    Alert.alert(`Issues updating ship board: Error: ${error}`);
    return shipBoard;
  }
};

// const removeChallenge = async (challengeId: string) => {
//   try {
//     const user = await userService.getCurrentUser();

//     if (user === null || user.id === '' || user.id === null) {
//       console.log('Cannot remove challenge because user does not exist');
//       return false;
//     }

//     const challenges = await getAllChallenges();

//     const updatedChallenges = challenges.filter(
//       challenge => challenge.id !== challengeId,
//     );

//     storeData(getShipBoardKey(user.id), updatedChallenges);
//     challengesDbTable.updateDbStoredChallenges(user.id, updatedChallenges);

//     return true;
//   } catch (error) {
//     Alert.alert(`Issues removing challenge: Error: ${error}`);
//     return false;
//   }
// };

// const getPercentage = (
//   currentValue: number,
//   initialValue: number,
//   targetValue: number,
// ) => {
//   const isPositiveCounting = initialValue <= targetValue;

//   const currentDiff = isPositiveCounting
//     ? currentValue - initialValue
//     : initialValue - currentValue;

//   let percentage = (currentDiff / Math.abs(targetValue - initialValue)) * 100;
//   percentage =
//     Number(targetValue) === 0 || targetValue === undefined ? 0 : percentage;
//   percentage = percentage > 100 ? 100 : percentage;
//   percentage = Math.floor(percentage);

//   return percentage;
// };

// const createNewChallenge = (
//   title: string,
//   description: string,
//   initial: number,
//   target: number,
//   imageLocation: string,
//   challengeType: ChallengeTypes,
// ) => {
//   if (title === '') {
//     Alert.alert('Title cannot be empty');
//     return null;
//   }

//   if (title.length > 20) {
//     Alert.alert('Title too long. Max 20 symbols allowed');
//     return null;
//   }

//   if (description.length > 90) {
//     Alert.alert('Description too long. Max 90 symbols allowed');
//     return null;
//   }

//   if (isNaN(initial)) {
//     Alert.alert('Initial value should be a number');
//     return null;
//   }

//   if (initial < 0) {
//     Alert.alert('Initial value should be positive');
//     return null;
//   }

//   if (isNaN(target)) {
//     Alert.alert('Target value should be a number');
//     return null;
//   }

//   if (target <= 0) {
//     Alert.alert('Target value should be positive');
//     return null;
//   }

//   const currentUtcTime = timeService.getCurrentDateString();
//   const challengeCandidate = {} as Challenge;

//   challengeCandidate.id = uuid.v4().toString();
//   challengeCandidate.title = title;
//   challengeCandidate.description = description;
//   challengeCandidate.initialValue = initial;
//   challengeCandidate.currentValue = initial;
//   challengeCandidate.targetValue = target;
//   challengeCandidate.image = imageLocation;
//   challengeCandidate.timeCreated = currentUtcTime;
//   challengeCandidate.lastTimeUpdated = currentUtcTime;
//   challengeCandidate.favorite = false;
//   challengeCandidate.status = ProgressStatus.NotStarted;
//   challengeCandidate.type = challengeType;

//   return challengeCandidate;
// };

const shipBoardService = {
  getShipBoard,
  updateShipBoardItem,
  updateShipBoard,
};

export default shipBoardService;
