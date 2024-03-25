import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from '../../hooks/useTheme';
import constants from '../../constants/constants';
import { BoardItem } from '../../entities/boardItem';
import gameService from "../../services/gameService";

const BORD_BORDER_LENGHT = constants.screenWidth * 0.63;

type ShipBoardItemProps = {
  item: BoardItem
  setValue: (newValue: string) => Promise<void>;
};

export const ShipBoardItem: React.FC<ShipBoardItemProps> = ({
  item,
  setValue,
}) => {
  const styles = createStyles();

  // useEffect(() => {
  //   console.log("Data has changed");
  // }, [item]);


  // const game = await gameService.getGameFromStorage(gameId);

  console.log(item);

  return (
    <TouchableOpacity
      disabled={item.isFixed}
      style={[styles.gridItemButtom, item.isShip ? styles.ship : null]}
      onPress={() => console.log("cia")}
      // onPress={() => }
    >
      <View style={[item.isFixed ? styles.symbolTileContainer : null]}>
        <Text style={[item.isFixed ? styles.symbolTileText : null]}>{item.value}</Text>
      </View>
    </TouchableOpacity>
  )
};

const createStyles = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    gridItemButtom: {
      height: BORD_BORDER_LENGHT * (1 / 11),
      width: BORD_BORDER_LENGHT * (1 / 11),
      borderColor: theme.colors.canvasInverted,
      borderWidth: 0.5,
      backgroundColor: theme.colors.canvas,
    },
    ship: {
      backgroundColor: theme.colors.tertiary,
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
    }
  });

  return styles;
};
