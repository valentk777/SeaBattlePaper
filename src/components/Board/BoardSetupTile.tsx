import React, { memo } from "react";
import { Alert, Pressable, StyleSheet } from "react-native";
import { useTheme } from '../../hooks/useTheme';
import constants from '../../constants/constants';
import { BoardItem } from '../../entities/boardItem';

type BoardSetupTileProps = {
  item: BoardItem
  onPress: () => void;
};

const BoardSetupTile = ({
  item,
  onPress,
}: BoardSetupTileProps) => {
  const styles = createStyles();

  return (
    <Pressable
      style={[styles.gridItemButtom, item.isShip ? styles.ship : null]}
      onPress={onPress}
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
      backgroundColor: theme.colors.tertiary,
    }
  });

  return styles;
};

export default memo(BoardSetupTile, (prevProps, nextProps) => {
  // This function returns true if passing nextProps would return the same result as passing prevProps to render
  return prevProps.item === nextProps.item;
});