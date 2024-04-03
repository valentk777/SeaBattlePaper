import React, { memo } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useTheme } from '../../hooks/useTheme';
import constants from '../../constants/constants';

type BoardPresentationTileProps = {
  text: string
};

const BoardPresentationTile = ({ text }: BoardPresentationTileProps) => {
  const styles = createStyles();

  return (
    <View style={styles.gridItemButtom}>
      <View style={styles.symbolTileContainer}>
        <Text style={styles.symbolTileText}>{text}</Text>
      </View>
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

export default memo(BoardPresentationTile, (prevProps, nextProps) => {
  // This function returns true if passing nextProps would return the same result as passing prevProps to render
  return prevProps.text === nextProps.text;
});