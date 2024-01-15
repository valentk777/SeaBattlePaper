import React from 'react'
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '../../hooks/useTheme';
import { AppTheme } from '../../styles/themeModels';
import { PaperAreaButton } from './PaperAreaButton';

interface SignInButtonProps {
  icon: ImageSourcePropType;
  text: string;
  onSignPress(): void;
}

export const SignInButton = (props: SignInButtonProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { text, icon, onSignPress } = props;

  return (
    <PaperAreaButton
      areaStyle={styles.area}
      buttonStyle={styles.button}
      textStyle={styles.text}
      onPress={onSignPress}
      text={text}
    >
      <Image
        source={icon}
        style={styles.image}
      />
    </PaperAreaButton>
  )
}

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    image: {
      width: 25,
      height: 25,
      marginRight: 15,
    },
    area: {
      marginVertical: 8,
      width: '100%',
      height: 45,
    },
    button: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.canvas
    },
    text: {
      fontFamily: theme.fonts.semiBold,
      color: theme.colors.tertiary,
    },
  });

  return styles;
};
