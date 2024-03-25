import React, { useCallback, useEffect } from 'react'
import { FlatList, ListRenderItem, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme';
import constants from '../../constants/constants';
import { PaperArea } from '../Background/PaperArea';
import { UserAccount } from '../../entities/user';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { ShipBoardItem } from './ShipBoardItem';
import { BoardItem } from '../../entities/boardItem';

const BORD_BORDER_LENGHT = constants.screenWidth * 0.63;

interface ShipsBoardProps {
  boardLocations: string[];
  board: BoardItem[];
  style?: any;
  disabled: boolean;
  onPress: (newValue: string) => Promise<void>;
}

export const ShipsBoard = ({ boardLocations, board, style, disabled, onPress }: ShipsBoardProps) => {
  const styles = createStyles();

  useEffect(() => {
    console.log("Data has changed");
  }, [boardLocations]);

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

  const renderItem: ListRenderItem<string> = ({ item: location }) => {
    const currentItem = board.find(x => x.location == location) as BoardItem;

    console.log("Rendered item: ", currentItem);

    return <ShipBoardItem item={currentItem} setValue={async () => await onPress(location)} />
  };

  return (
    <View style={[disabled ? styles.disabled : null, styles.container, style]}>
      <PaperArea
        areaStyle={styles.areaStyle}
        componentStyle={styles.componentStyle}
      >
        <FlatList
          data={boardLocations}
          renderItem={renderItem}
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
    gridItem: {
    },
    disabled: {
      pointerEvents: 'none',
    }
  });

  return styles;
};
