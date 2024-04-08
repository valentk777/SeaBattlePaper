import React from "react";
import { StyleSheet, Image } from "react-native";
import { useTheme } from '../hooks/useTheme';
import { icons } from "../assets";
import { PaperAreaButton } from "./ButtonWrapper/PaperAreaButton";

interface MarkButtonProps {
  style?: any;
  onPress: any;
}

export const MarkButton = ({ style, onPress }: MarkButtonProps) => {
  const styles = createStyles();

  return (
    <PaperAreaButton
      areaStyle={{...style, ...styles.areaStyle}}
      buttonStyle={styles.buttonStyle}
      onPress={onPress}
    >
      <Image
        source={icons['editing.png']}
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
      height: '100%'
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
