import React, { memo } from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { useTheme } from '../../hooks/useTheme';
import constants from '../../constants/constants';
import { BoardItem } from '../../entities/boardItem';
import { BoardItemStatus } from "../../entities/boardItemStatus";

type BoardMyGameTileProps = {
  item: BoardItem
  onPress: () => void;
};

const BoardMyGameTile = ({
  item,
  onPress,
}: BoardMyGameTileProps) => {
  const styles = createStyles();

  return (
    <Pressable
      style={styles.gridItemButtom}
      onPress={onPress}
      disabled={item.status !== BoardItemStatus.NotSelected}
    >
      {item.isShip && item.status === BoardItemStatus.Attacked ? <Text style={styles.attackedShip}>✖</Text> : null}
      {!item.isShip && item.status === BoardItemStatus.Attacked ? <Text style={styles.missed}>⊙</Text> : null}
      {item.status === BoardItemStatus.Marked ? <Text style={styles.marked}>✔</Text> : null}
    </Pressable>
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
    marked: {
      height: "100%",
      textAlign: "center",
      color: theme.colors.tertiary,
    }
  });

  return styles;
};

export default memo(BoardMyGameTile, (prevProps, nextProps) => {
  // This function returns true if passing nextProps would return the same result as passing prevProps to render
  return prevProps.item === nextProps.item;
});