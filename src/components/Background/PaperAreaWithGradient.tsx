import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from '../../hooks/useTheme';
import { AppTheme } from "../../styles/themeModels";
import LinearGradient from "react-native-linear-gradient";
import { PaperArea } from "./PaperArea";

interface PaperAreaWithGradientProps {
  children: React.ReactNode | undefined;
  areaStyle?: any;
  componentStyle?: any;
}

export const PaperAreaWithGradient = ({ children, areaStyle, componentStyle }: PaperAreaWithGradientProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <PaperArea areaStyle={{ ...styles.container, ...areaStyle }} componentStyle={componentStyle}>
      <LinearGradient
        // start={{ x: 0.9, y: 0 }}
        colors={styles.linearGradient.colors}
        locations={[0, 0.1, 0.9, 1]}
        style={styles.linearGradient}
      >
        {children}
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
    },
  });

  return styles;
};
