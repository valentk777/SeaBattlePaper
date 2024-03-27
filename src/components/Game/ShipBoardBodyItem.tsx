import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from '../../hooks/useTheme';
import constants from '../../constants/constants';

const BORD_BORDER_LENGHT = constants.screenWidth * 0.63;

type ShipBoardBodyItemProps = {
  text: string
};

const ShipBoardBodyItem: React.FC<ShipBoardBodyItemProps> = ({
  text,
}) => {
  const styles = createStyles();

  return (
    <TouchableOpacity
      disabled={true}
      style={styles.gridItemButtom}
    >
      <View style={styles.symbolTileContainer}>
        <Text style={styles.symbolTileText}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
};

export default React.memo(ShipBoardBodyItem);

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
