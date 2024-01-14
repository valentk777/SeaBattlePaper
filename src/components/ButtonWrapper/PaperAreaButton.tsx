import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from '../../hooks/useTheme';
import { AppTheme } from "../../styles/themeModels";
import { PaperArea } from "../Background/PaperArea";

interface PaperAreaButtonProps {
  areaStyle?: any;
  buttonStyle?: any;
  textStyle?: any;
  text: string;
  onPress(): void;
  buttonColor?: string;
  children?: React.ReactNode | undefined;
}

export const PaperAreaButton = (props: PaperAreaButtonProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { text, onPress, areaStyle, textStyle, buttonColor, buttonStyle, children } = props;

  return (
    <PaperArea style={areaStyle}>
    <TouchableOpacity
      style={{...styles.buttonStyle, ...buttonStyle, backgroundColor: buttonColor}}
      onPress={onPress}
    >
        {children}
        <Text
          style={{...styles.textStyle, ...textStyle}}>
          {text}
        </Text>
    </TouchableOpacity>
    </PaperArea>
  );
};

const createStyles = (theme: AppTheme) => {
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
