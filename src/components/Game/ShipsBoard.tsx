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


interface ShipsBoardProps {
  board: BoardItem[];
  onPress: (newBoard: BoardItem[]) => void;
  disabled: boolean;
  style?: any;
}

const ShipsBoard = ({ board, onPress,  disabled, style }: ShipsBoardProps) => {
  const styles = createStyles();
  // const { board, updateBoard } = useContext(ShipBoardContext);

  // const [locations] = useState(shipBoardService.generateNewShipBoardLocations);
  // const [letters] = useState(shipBoardService.generateLetters);
  // const [numbers] = useState(shipBoardService.generateNumbers);

  // useEffect(() => {
  //   console.log("RE-RENDERING --- ShipsBoard");
  // }, [board]);






  const updateCurrentBoard = useCallback((boardItemLocation: string) => {
    // let newBoardItem = {}
    const newBoard = board.map((boardItem, i) => {
      if (boardItem.key === boardItemLocation) {
        const newBoardItem = { ...boardItem, isShip: !boardItem.isShip } as BoardItem;
        return newBoardItem
      } else {
        return boardItem;
      }
    });

    onPress(newBoard);

    console.log(newBoard)
    // return newBoardItem;
  }, []);


  // const user = useCurrentUser() as UserAccount;

  // const { game, updateGame } = useContext(ActiveGameContext);
  // const { board, updateBoard } = useContext(ShipBoardContext);

  // const onPressBox = async (item: BoardItem) => {

  //   const newItem = {
  //     ...item,
  //     selected: !item.selected,
  //   } as BoardItem;

  //   // const newItem = {
  //   //   key: item.key,
  //   //   selected: !item.selected,
  //   //   fixed: item.fixed,
  //   //   value: item.value,
  //   // } as BoardItem; 

  //   // const updatedGame = gameService.getUpdateGameOnPress(game, newItem, user.id) as Game;

  //   const index = board.findIndex(currentItem => currentItem.key === item.key)
  //   board[index] = newItem;

  //   await updateBoard(board);
  // }

  const renderBodyItem: ListRenderItem<string> = useCallback(({ item }) => {
    console.log("RE-RENDER SHAPE: ", item);

    return <ShipBoardBodyItem text={item} />
  }, []);
  
  const renderboardItem: ListRenderItem<string> = ({ item: key }) => {
    const currentItem = board.find(x => x.key == key) as BoardItem;

    return <ShipBoardItem item={currentItem} setValue={(key) => updateCurrentBoard(key)} />
  };

  const RenderBoardLetters = memo(() => {
    return (
      <View style={styles.bodyRow}>
        <View style={styles.cornerBox} />
        <FlatList
          data={letters}
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

  const RenderBoardNumbers = memo(() => {
    return (
      <View style={{ height: constants.BOARD_FULL_LENGHT, width: constants.BOARD_CELL_LENGHT, }}>
        <FlatList
          data={numbers}
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

  const RenderActiveBoard = () => {
    return (
      <View style={{ height: constants.BOARD_ACTIVE_LENGHT, width: constants.BOARD_ACTIVE_LENGHT, }}>
        <FlatList
          data={locations}
          renderItem={renderboardItem}
          numColumns={10}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshing={false}
          initialNumToRender={100}
          scrollEnabled={false}
        />
      </View>
    )
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
            <RenderActiveBoard />
          </View>
        </View>
      </PaperArea>
    </View>
  )
};

const createStyles = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
    },
    areaStyle: {
      height: constants.BOARD_FULL_LENGHT + 6,
      width: constants.BOARD_FULL_LENGHT + 18,
    },
    componentStyle: {
      backgroundColor: theme.colors.canvasInverted,
      height: '100%'
    },
    grid: {
      height: constants.BOARD_FULL_LENGHT,
      width: constants.BOARD_FULL_LENGHT,
    },
    bodyRow: {
      flexDirection: 'row',
    },
    cornerBox: {
      backgroundColor: theme.colors.primary,
      height: constants.BOARD_CELL_LENGHT,
      width: constants.BOARD_CELL_LENGHT,
    },
    disabled: {
      pointerEvents: 'none',
    }
  });

  return styles;
};

export default memo(ShipsBoard);