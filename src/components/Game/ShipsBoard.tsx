import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme';
import constants from '../../constants/constants';
import { PaperArea } from '../Background/PaperArea';
import { UserAccount } from '../../entities/user';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import ShipBoardItem from './ShipBoardItem';
import { BoardItem } from '../../entities/boardItem';
import shipBoardService from '../../services/shipBoardService';
import { Game } from '../../entities/game';
import ShipBoardBodyItem from './ShipBoardBodyItem';
import { ShipBoardContext } from '../../hooks/useShipBoard';

const BORD_BORDER_LENGHT = constants.screenWidth * 0.63;

interface ShipsBoardProps {
  // board: BoardItem[];
  style?: any;
  disabled: boolean;
  // onPress: (newValue: string) => Promise<void>;
}

export const ShipsBoard = memo(({ style, disabled }: ShipsBoardProps) => {
  const styles = createStyles();
  const { board, updateBoard } = useContext(ShipBoardContext);
  
  const generateNewShipBoardLocations = useMemo(shipBoardService.generateNewShipBoardLocations, []);
  const generateLetters = useMemo(shipBoardService.generateLetters, []);
  const generateNumbers = useMemo(shipBoardService.generateNumbers, []);
  
  useEffect(() => {
    console.log("RE-RENDERING --- ShipsBoard");
  }, [board]);






  const updateCurrentBoard = (boardItemLocation: string) => {
    // let newBoardItem = {}

    const newBoard = board.map((boardItem, i) => {
      if (boardItem.location === boardItemLocation) {
        const newBoardItem =  { ...boardItem, isShip: !boardItem.isShip } as BoardItem;
        return newBoardItem
      } else {
        return boardItem;
      }
    });

    updateBoard(newBoard);

    // return newBoardItem;
  };


  // const user = useCurrentUser() as UserAccount;

  // const { game, updateGame } = useContext(ActiveGameContext);
  // const { board, updateBoard } = useContext(ShipBoardContext);

  // const onPressBox = async (item: BoardItem) => {

  //   const newItem = {
  //     ...item,
  //     selected: !item.selected,
  //   } as BoardItem;

  //   // const newItem = {
  //   //   location: item.location,
  //   //   selected: !item.selected,
  //   //   fixed: item.fixed,
  //   //   value: item.value,
  //   // } as BoardItem; 

  //   // const updatedGame = gameService.getUpdateGameOnPress(game, newItem, user.id) as Game;

  //   const index = board.findIndex(currentItem => currentItem.location === item.location)
  //   board[index] = newItem;

  //   await updateBoard(board);
  // }

  const renderBodyItem: ListRenderItem<string> =  useCallback(({ item }) => {
    console.log("RE-RENDER SHAPE: ", item);
  
    return <ShipBoardBodyItem text={item} />
  }, []);
  
  const RenderBoardLetters = React.memo(() => {
    return (
      <View style={styles.bodyRow}>
        <View style={styles.cornerBox} />
        <FlatList
          data={generateLetters}
          renderItem={renderBodyItem}
          numColumns={10}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshing={false}
          initialNumToRender={10}
          scrollEnabled={false}
        />
      </View>
    )
  });
  
  const RenderBoardNumbers = React.memo(() => {
    return (
      <View style={{ height: BORD_BORDER_LENGHT, width: BORD_BORDER_LENGHT / 11, }}>
      <FlatList
        data={generateNumbers}
        renderItem={renderBodyItem}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        refreshing={false}
        initialNumToRender={10}
        scrollEnabled={false}
      />
    </View>
    )
  });













  const renderboardItem: ListRenderItem<string> = ({ item: location }) => {
    const currentItem = board.find(x => x.location == location) as BoardItem;

    return <ShipBoardItem item={currentItem} setValue={async () => await onPress(location)} />
  };




  return (
    <View style={[disabled ? styles.disabled : null, styles.container, style]}>
      <PaperArea
        areaStyle={styles.areaStyle}
        componentStyle={styles.componentStyle}
      >
        <View style={styles.grid}>
          <RenderBoardLetters />
          <View style={styles.bodyRow}>
            <RenderBoardNumbers />
            <View style={{ height: BORD_BORDER_LENGHT * 10 / 11, width: BORD_BORDER_LENGHT * 10 / 11, }}>
              <FlatList
                data={generateNewShipBoardLocations}
                renderItem={renderboardItem}
                numColumns={10}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                refreshing={false}
                initialNumToRender={100}
                scrollEnabled={false}
              />
            </View>
          </View>
        </View>
      </PaperArea>
    </View>
  )
});

const createStyles = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
    },
    areaStyle: {
      height: BORD_BORDER_LENGHT + 6,
      width: BORD_BORDER_LENGHT + 18,
    },
    componentStyle: {
      backgroundColor: theme.colors.canvasInverted,
      height: '100%'
    },
    grid: {
      height: BORD_BORDER_LENGHT,
      width: BORD_BORDER_LENGHT,
    },
    bodyRow: {
      flexDirection: 'row',
    },
    cornerBox: {
      backgroundColor: theme.colors.primary,
      height: BORD_BORDER_LENGHT / 11,
      width: BORD_BORDER_LENGHT / 11,
    },
    disabled: {
      pointerEvents: 'none',
    }
  });

  return styles;
};