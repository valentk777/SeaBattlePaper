import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme';
import constants from '../../constants/constants';
import { PaperArea } from '../Background/PaperArea';
import { BoardItem } from '../../entities/boardItem';
import { UserAccount } from '../../entities/user';
import { useCurrentUser } from '../../hooks/useCurrentUser';

const BORD_BORDER_LENGHT = constants.screenWidth * 0.63;

interface ShipsBoardProps {
  board: BoardItem[];
  style?: any;
  disabled: boolean;
  onPress: any;
}

export const ShipsBoard = ({ board, style, disabled, onPress }: ShipsBoardProps) => {
  const styles = createStyles();

  const user = useCurrentUser() as UserAccount;

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

  const renderItem = ({ item }) => {

    return (
      <TouchableOpacity
        disabled={item.isFixed}
        onPress={async () => await onPress(item)}
        style={[styles.gridItemButtom, item.isShip ? styles.ship : null]}
      >
        <View style={[item.isFixed ? styles.symbolTileContainer : null]}>
          <Text style={[item.isFixed ? styles.symbolTileText : null]}>{item.value}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  console.log(board);

  return (
    <View style={[disabled ? styles.disabled : null, styles.container, style]}>
      <PaperArea
        areaStyle={styles.areaStyle}
        componentStyle={styles.componentStyle}
      >
        <FlatList
          data={board}
          renderItem={renderItem}
          keyExtractor={(item) => item.location}
          numColumns={11}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshing={false}
          // initialNumToRender={121}
          scrollEnabled={false}
          style={styles.flatList}
        // extraData={selectedLocations} 
        />
      </PaperArea>
    </View>
  )
}

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
    },
    flatList: {

    },
    gridItemButtom: {
      height: BORD_BORDER_LENGHT * (1 / 11),
      width: BORD_BORDER_LENGHT * (1 / 11),
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
    },
    symbolTileText: {
      fontSize: 18,
      color: theme.colors.tertiary,
      fontFamily: theme.fonts.medium,
    },
    ship: {
      backgroundColor: theme.colors.tertiary,
    },
    gridItem: {
    },
    disabled: {
      pointerEvents: 'none',
    }
  });

  return styles;
};
