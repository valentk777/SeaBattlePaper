import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from '../../hooks/useTheme';
import { PaperArea } from "../Background/PaperArea";

interface PaperAreaButtonProps {
  areaStyle?: any;
  buttonStyle?: any;
  textStyle?: any;
  text?: string;
  onPress(): void;
  children?: React.ReactNode | undefined;
}

export const PaperAreaButton = (props: PaperAreaButtonProps) => {
  const styles = createStyles();
  const { text, onPress, areaStyle, textStyle, buttonStyle, children } = props;

  return (
    <PaperArea areaStyle={areaStyle}>
      <TouchableOpacity
        style={{ ...styles.buttonStyle, ...buttonStyle }}
        onPress={onPress}
      >
        {children}
        <Text
          style={{ ...styles.textStyle, ...textStyle }}>
          {text}
        </Text>
      </TouchableOpacity>
    </PaperArea>
  );
};

const createStyles = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    buttonStyle: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    textStyle: {
    },
  });

  return styles;
};
