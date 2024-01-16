// TODO: refactor later. Now just let's make it work
import firebase from '@react-native-firebase/database';

import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme';
import { AppTheme } from '../../styles/themeModels';
import constants from '../../constants/constants';
import { PaperArea } from '../Background/PaperArea';
import { BoardItem } from '../../entities/boardItem';
import shipBoardService from '../../services/shipBoardService';

const BORD_BORDER_LENGHT = constants.screenWidth * 0.75;

interface ShipsBoardProps {
  gameId: string;
}

export const ShipsBoard = ({ gameId }: ShipsBoardProps) => {
  const styles = createStyles();

  const [shipBoard, updateShipBoard] = useState([] as BoardItem[]);

  useEffect(() => {
    readData();

    // const gameRef = firebase
    // .app()
    // .database('https://seabattlepaper-default-rtdb.europe-west1.firebasedatabase.app/')
    // .ref(`/activeGames/${gameId}`)
    // .on('value', snapshot => {
    //     console.log('Active game data: ', snapshot.val());
    //   });

    // Stop listening for updates when no longer required
    // return () => database().ref(`/users/${userId}`).off('value', onValueChange);
  }, []);

  useEffect(() => {
    // readData();

    // const gameRef = firebase
    // .app()
    // .database('https://seabattlepaper-default-rtdb.europe-west1.firebasedatabase.app/')
    // .ref(`/activeGames/${gameId}`)
    // .on('value', snapshot => {
    //     console.log('Active game data: ', snapshot.val());
    //   });

    // Stop listening for updates when no longer required
    // return () => database().ref(`/users/${userId}`).off('value', onValueChange);
  }, [shipBoard]);

  const readData = async () => {
    try {
      const shipBoard = await shipBoardService.getShipBoard(gameId);

      if (shipBoard.length == 0) {
        return;
      }

      updateShipBoard(shipBoard);

    } catch (error) {
      Alert.alert(`${error}`)
    }
  }

  const onPressBox = async (item: BoardItem) => {
    item.selected = !item.selected;

    const updatedShipBoard = await shipBoardService.updateShipBoard(gameId, shipBoard, item);

    updateShipBoard(updatedShipBoard);
  }

  const renderItem = ({ item }) => {
    const selectedItemStyle = item.selected ? styles.selectedItem : null;

    return (
      <TouchableOpacity
        disabled={item.fixed}
        onPress={() => onPressBox(item)}
        style={[styles.gridItemButtom, selectedItemStyle]}
      />
    )
  };

  return (
    <View style={styles.container}>
      <View style={styles.letterRow}>
      <View style={styles.x1}>
          {/* <Text>First column</Text> */}
        </View>
        <View style={styles.x2}>
          <Text>1, 2, 3</Text>
        </View>
      </View>
      <View style={styles.numberRow}>
      <View style={styles.x3}>
          <Text>1, 2, 3</Text>
        </View>
        <View style={styles.x4}>
        <PaperArea
        areaStyle={styles.areaStyle}
        componentStyle={styles.componentStyle}
      >
        <FlatList
          // contentContainerStyle={ }
          data={shipBoard}
          renderItem={renderItem}
          keyExtractor={(item) => item.location}
          numColumns={10}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          // ItemSeparatorComponent={}
          refreshing={false}
          initialNumToRender={100}
          scrollEnabled={false}
          style={styles.flatList}
        />
      </PaperArea>
      </View>
      </View>
    </View>
  )
}

const createStyles = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      height: BORD_BORDER_LENGHT + 50,
      width: BORD_BORDER_LENGHT + 50,

      // flex: 11, 
      // marginHorizontal: "auto",
      // width: 400,
      // backgroundColor: "red"


      // alignItems: 'flex-end',
      // justifyContent: 'flex-end',

      // backgroundColor: 'green',
    },
    letterRow: {
      flexDirection: "row",
      width: BORD_BORDER_LENGHT + BORD_BORDER_LENGHT * 0.1,
      height: BORD_BORDER_LENGHT * 0.1,
    },
    x1:  {
      backgroundColor:  "lightblue",
      width: BORD_BORDER_LENGHT * 0.1,
    },
    x2: {
      backgroundColor:  "green",
      width: BORD_BORDER_LENGHT
    },
    numberRow : {
      backgroundColor:  "lightblue",
      height: BORD_BORDER_LENGHT,
      width: BORD_BORDER_LENGHT * 0.1,
      flexDirection: "row",
    },
    x3: {
      height: BORD_BORDER_LENGHT + BORD_BORDER_LENGHT * 0.1,
      width: BORD_BORDER_LENGHT * 0.1,
    },
    x4: {
      height: BORD_BORDER_LENGHT + BORD_BORDER_LENGHT * 0.1,
      width: BORD_BORDER_LENGHT * 0.1,
    },
    areaStyle: {
      height: BORD_BORDER_LENGHT + 6,
      width: BORD_BORDER_LENGHT + 18,
    },
    componentStyle: {
      backgroundColor: theme.colors.canvasInverted,
    },
    flatList: {

    },
    gridItemButtom: {
      height: BORD_BORDER_LENGHT * 0.1,
      width: BORD_BORDER_LENGHT * 0.1,
      borderColor: theme.colors.canvasInverted,
      borderWidth: 0.5,
      backgroundColor: theme.colors.canvas,
    },
    selectedItem: {
      backgroundColor: theme.colors.tertiary,
    },
    gridItem: {
    }
  });

  return styles;
};
