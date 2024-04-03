import React from 'react';
import { ButtonProps, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AppTheme } from '../../styles/themeModels';
import { useTheme } from '../../hooks/useTheme';
import LinearGradient from 'react-native-linear-gradient'

interface SaveButtonProps extends ButtonProps {
  isRoundTop?: boolean
  isRoundBottom?: boolean
  roundRadius?: number
}

export const SaveButton = (props: SaveButtonProps) => {
  const { onPress, title, isRoundTop, isRoundBottom, roundRadius } = props;

  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <TouchableOpacity
      onPress={onPress}>
      <LinearGradient
        locations={[0.2, 1]}
        colors={styles.buttonSave.colors}
        style={[
          styles.buttonSave,
          isRoundTop ? {
            borderTopLeftRadius: roundRadius != undefined ? roundRadius : 30,
            borderTopRightRadius: roundRadius != undefined ? roundRadius : 30,
          } : {},
          isRoundBottom ? {
            borderBottomLeftRadius: roundRadius != undefined ? roundRadius : 30,
            borderBottomRightRadius: roundRadius != undefined ? roundRadius : 30,
          } : {}]}
      >
        <Text
          style={styles.textPrimary}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    textPrimary: {
      fontSize: 18,
      lineHeight: 35,
      color: theme.colors.canvas,
      fontFamily: theme.fonts.bold,
    },
    buttonSave: {
      height: '100%',
      width: '100%',
      colors: [theme.colors.primary, theme.colors.secondary],
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 5,
    }
  });

  return styles;
};
