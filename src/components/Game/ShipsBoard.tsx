// TODO: refactor later. Now just let's make it work
import firebase from '@react-native-firebase/database';

import React, { useContext, useEffect, useState } from 'react'
import { Alert, FlatList, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme';
import { AppTheme } from '../../styles/themeModels';
import constants from '../../constants/constants';
import { PaperArea } from '../Background/PaperArea';
import { BoardItem } from '../../entities/boardItem';
import shipBoardService from '../../services/shipBoardService';
import { UserAccount } from '../../entities/user';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { PlayerBoard } from '../../entities/playerBoard';
import { ActiveGameContext } from '../../hooks/useActiveGame';
import gameService from '../../services/gameService';

const BORD_BORDER_LENGHT = constants.screenWidth * 0.8;

interface ShipsBoardProps {
  // playerBoard: PlayerBoard;
}

export const ShipsBoard = (props: ShipsBoardProps) => {
  const styles = createStyles();

  const user = useCurrentUser() as UserAccount;
  const { game, updateGame } = useContext(ActiveGameContext);

  // useEffect(() => {
  //   readData();

  //   // const gameRef = firebase
  //   // .app()
  //   // .database('https://seabattlepaper-default-rtdb.europe-west1.firebasedatabase.app/')
  //   // .ref(`/activeGames/${gameId}`)
  //   // .on('value', snapshot => {
  //   //     console.log('Active game data: ', snapshot.val());
  //   //   });

  //   // Stop listening for updates when no longer required
  //   // return () => database().ref(`/users/${userId}`).off('value', onValueChange);
  // }, []);

  // useEffect(() => {
  //   // readData();

  //   // const gameRef = firebase
  //   // .app()
  //   // .database('https://seabattlepaper-default-rtdb.europe-west1.firebasedatabase.app/')
  //   // .ref(`/activeGames/${gameId}`)
  //   // .on('value', snapshot => {
  //   //     console.log('Active game data: ', snapshot.val());
  //   //   });

  //   // Stop listening for updates when no longer required
  //   // return () => database().ref(`/users/${userId}`).off('value', onValueChange);
  // }, [shipBoard]);

  // const readData = async () => {
  //   try {
  //     const shipBoard = await shipBoardService.getShipBoard(gameId);

  //     if (shipBoard.length == 0) {
  //       return;
  //     }

  //     updateShipBoard(shipBoard);

  //   } catch (error) {
  //     Alert.alert(`${error}`)
  //   }
  // }

  const onPressBox = async (item: BoardItem) => {
    item.selected = !item.selected;

    await gameService.updateGameOnBoardPress(game, item, user.id);
  }

  const renderItem = ({ item }) => {
    const selectedItemStyle = item.selected ? styles.selectedItem : null;

    return (
      <TouchableOpacity
        disabled={item.fixed}
        onPress={() => onPressBox(item)}
        style={[styles.gridItemButtom, selectedItemStyle]}
      >
        <View style={[item.value !== "" ? styles.symbolTileContainer : null]}>
          <Text style={[item.value !== "" ? styles.symbolTileText : null]}>{item.value}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  return (
    <View style={styles.container}>
      <PaperArea
        areaStyle={styles.areaStyle}
        componentStyle={styles.componentStyle}
      >
        <FlatList
          // contentContainerStyle={ }
          data={shipBoardService.getCurrentPlayerBoard(game, user.id)}
          renderItem={renderItem}
          keyExtractor={(item) => item.location}
          numColumns={11}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          // ItemSeparatorComponent={}
          refreshing={false}
          initialNumToRender={121}
          scrollEnabled={false}
          style={styles.flatList}
        />
      </PaperArea>
    </View>
  )
}

const createStyles = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      // height: BORD_BORDER_LENGHT + 50,
      // width: BORD_BORDER_LENGHT + 50,

      // flex: 11, 
      // marginHorizontal: "auto",
      // width: 400,
      // backgroundColor: "red"


      // alignItems: 'flex-end',
      // justifyContent: 'flex-end',

      // backgroundColor: 'green',
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
    symbolTileContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      height: '100%',
      width: '100%',
      backgroundColor: theme.colors.primary,
      // borderWidth: 1,
      // borderColor: theme.colors.canvasInverted,
    },
    symbolTileText: {
      fontSize: 18,
      color: theme.colors.tertiary,
      fontFamily: theme.fonts.medium,
    },
    selectedItem: {
      backgroundColor: theme.colors.tertiary,
    },
    gridItem: {
    }
  });

  return styles;
};
