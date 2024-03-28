import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from '../../hooks/useTheme';
import { AppTheme } from "../../styles/themeModels";
import { SvgFileNamesToComponentsMap } from "../../assets/svgIndex";
import constants from "../../constants/constants";

interface BackgroundProps {
  style?: any;
}

export const Background = ({ style }: BackgroundProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const BackgroundImage = SvgFileNamesToComponentsMap['SquerePaper.js'];

  return (
    <View style={{ ...styles.container, ...style }}>
      <View style={styles.background}>
        <BackgroundImage
          width="100%"
          height="100%"
          backgroundColor={theme.colors.secondary}
          primaryColor={theme.colors.secondary}
          secondaryColor={theme.colors.secondary}
          borderColor={theme.colors.secondary}
        >
        </BackgroundImage>
      </View>
    </View>
  );
};

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      justifyContent: 'center',
      alignItems: 'center',
      width: constants.SCREEN_WIDTH,
      height: constants.SCREEN_HEIGHT,
      zIndex: -1,
    },
    background: {
      backgroundColor: theme.colors.primary,
      width: "120%",
      height: "120%",
    },
  });

  return styles;
};
