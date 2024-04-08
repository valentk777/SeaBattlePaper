import React, { memo } from "react";
import { Text, StyleSheet, View } from "react-native";
import { useTheme } from '../../hooks/useTheme';
import constants from '../../constants/constants';
import { BoardItem } from '../../entities/boardItem';
import { BoardItemStatus } from "../../entities/boardItemStatus";

type BoardOpponentGameTileProps = {
  item: BoardItem
};

const BoardOpponentGameTile = ({ item }: BoardOpponentGameTileProps) => {
  const styles = createStyles();

  return (
    <View
      style={styles.gridItemButtom}
    >
      {item.isShip && item.status !== BoardItemStatus.Attacked ? <Text style={styles.ship} /> : null}
      {item.isShip && item.status === BoardItemStatus.Attacked ? <Text style={styles.attackedShip}>✖</Text> : null}
      {!item.isShip && item.status === BoardItemStatus.Attacked ? <Text style={styles.missed}>⊙</Text> : <Text />}
    </View>
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
      height: "100%",
      textAlign: "center",
      backgroundColor: theme.colors.tertiary
    },
    attackedShip: {
      height: "100%",
      textAlign: "center",
      color: theme.colors.secondary,
      backgroundColor: theme.colors.tertiary
    },
    missed: {
      height: "100%",
      textAlign: "center",
      color: theme.colors.tertiary,
      fontSize: theme.sizes.medium
    },
  });

  return styles;
};

export default memo(BoardOpponentGameTile, (prevProps, nextProps) => {
  // This function returns true if passing nextProps would return the same result as passing prevProps to render
  return prevProps.item === nextProps.item;
});