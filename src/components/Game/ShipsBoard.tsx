import React, { useContext } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme';
import constants from '../../constants/constants';
import { PaperArea } from '../Background/PaperArea';
import { BoardItem } from '../../entities/boardItem';
import shipBoardService from '../../services/shipBoardService';
import { UserAccount } from '../../entities/user';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { ActiveGameContext } from '../../hooks/useActiveGame';
import gameService from '../../services/gameService';
import { Game } from '../../entities/game';

const BORD_BORDER_LENGHT = constants.screenWidth * 0.63;

interface ShipsBoardProps {
  style?: any;
  isMyShipBoard: boolean;
}

export const ShipsBoard = ({style, isMyShipBoard}: ShipsBoardProps) => {
  const styles = createStyles();

  const user = useCurrentUser() as UserAccount;
  const { game, updateGame } = useContext(ActiveGameContext);

  const onPressBox = async (item: BoardItem) => {
    console.log(item);

    const newItem = {
      location: item.location,
      selected: !item.selected,
      fixed: item.fixed,
      value: item.value,
    } as BoardItem;

    const updatedGame = gameService.getUpdateGameOnPress(game, newItem, user.id) as Game;

    updateGame(updatedGame);
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
    <View style={{...styles.container, ...style}}>
      <PaperArea
        areaStyle={styles.areaStyle}
        componentStyle={styles.componentStyle}
      >
        <FlatList
          data={isMyShipBoard ? shipBoardService.getCurrentPlayerBoard(game, user.id) : shipBoardService.getCompetitorPlayerBoard(game, user.id)}
          renderItem={renderItem}
          keyExtractor={(item) => item.location}
          numColumns={11}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshing={false}
          initialNumToRender={121}
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
