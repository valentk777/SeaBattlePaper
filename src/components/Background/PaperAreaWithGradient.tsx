import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from '../../hooks/useTheme';
import { AppTheme } from "../../styles/themeModels";
import { SvgFileNamesToComponentsMap } from "../../assets/svgIndex";
import LinearGradient from "react-native-linear-gradient";
import { PaperArea } from "./PaperArea";

interface PaperAreaWithGradientProps {
  children?: React.ReactNode | undefined;
  style?: any;
}

export const PaperAreaWithGradient = ({ children, style }: PaperAreaWithGradientProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <PaperArea style={{...styles.container, ...style}}>
      <LinearGradient
        // start={{ x: 0.9, y: 0 }}
        colors={styles.linearGradient.colors}
        locations={[0, 0.1, 0.9, 1]}
        style={styles.linearGradient}
      >
        {/* <View style={{
          borderColor: theme.colors.tertiary,
          borderWidth: 1,
          // backgroundColor: theme.colors.canvas,
          justifyContent: 'center',
          alignItems: 'center',
        }}> */}
          {children}
        {/* </View> */}
      </LinearGradient>
    </PaperArea>
  );
};

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
    },
    linearGradient: {
      height: '100%',
      width: '100%',
      colors: [theme.colors.canvas, theme.colors.secondary, theme.colors.secondary, theme.colors.canvas],
      // justifyContent: 'center',
      // alignItems: 'center',
    },
  });

  return styles;
};
