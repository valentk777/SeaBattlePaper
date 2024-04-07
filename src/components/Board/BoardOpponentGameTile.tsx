import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from '../../hooks/useTheme';
import constants from '../../constants/constants';
import { BoardItem } from '../../entities/boardItem';
import { BoardItemStatus } from "../../entities/boardItemStatus";

type BoardOpponentGameTileProps = {
  item: BoardItem
};

const BoardOpponentGameTile = ({ item }: BoardOpponentGameTileProps) => {
  const styles = createStyles();

  console.log("re-render BoardOpponentGameTile");

  let tileStyle = {};

  if (item.isShip && item.status == BoardItemStatus.Attacked) {
    tileStyle = styles.attackedShip
  } else if (!item.isShip && item.status == BoardItemStatus.Attacked) {
    tileStyle = styles.missed
  } else if (item.isShip) {
    tileStyle = styles.ship
  }

  return (
    <View
      style={[styles.gridItemButtom, tileStyle]}
    />
  )
};

const createStyles = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    gridItemButtom: {
      height: constants.BOARD_CELL_LENGHT,
      width: constants.BOARD_CELL_LENGHT,
      borderColor: theme.colors.canvasInverted,
      borderWidth: 0.5,
      backgroundColor: theme.colors.canvas,
    },
    ship: {
      backgroundColor: theme.colors.tertiary
    },
    attackedShip: {
      backgroundColor: "red"
    },
    missed: {
      backgroundColor: "green"
    },

  });

  return styles;
};

export default memo(BoardOpponentGameTile, (prevProps, nextProps) => {
  // This function returns true if passing nextProps would return the same result as passing prevProps to render
  return prevProps.item === nextProps.item;
});