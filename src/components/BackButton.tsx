import React from "react";
import { StyleSheet, Image } from "react-native";
import { useTheme } from '../hooks/useTheme';
import { icons } from "../assets";
import { PaperAreaButton } from "./ButtonWrapper/PaperAreaButton";

interface BackButtonProps {
  style?: any;
  onPress: any;
}

export const BackButton = ({ style, onPress }: BackButtonProps) => {
  const styles = createStyles();

  return (
    <PaperAreaButton
      areaStyle={styles.areaStyle}
      buttonStyle={styles.buttonStyle}
      onPress={onPress}
    >
      <Image
        source={icons['back-arrow.png']}
        resizeMode="contain"
        style={styles.image}
      />
    </PaperAreaButton>
  );
};

const createStyles = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    areaStyle: {
      width: 45,
      height: 35,
    },
    buttonStyle: {
      backgroundColor: theme.colors.canvas,
    },
    image: {
      top: 10,
      width: 20,
      height: 20,
      tintColor: theme.colors.tertiary,
    }
  });

  return styles;
};
