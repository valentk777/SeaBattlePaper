import React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from '../../hooks/useTheme';
import { AppTheme } from "../../styles/themeModels";

interface PaperAreaProps {
  children: React.ReactNode | undefined;
  areaStyle?: any;
  componentStyle?: any;
}

export const PaperArea = ({ children, componentStyle, areaStyle }: PaperAreaProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={{ ...styles.container, ...areaStyle }}>
      <View style={styles.firstArea}>
        <View style={styles.secondArea}>
          <View style={{...styles.thirdArea, ...componentStyle}}>
            {children}
          </View>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
    },
    firstArea: {

      // flex: 1,
      // width: '100%',
      borderColor: theme.colors.tertiary,
      borderTopWidth: 1,
      borderBottomWidth: 1,
    },
    secondArea: {
      // height: '100%',
      // width: '100%',
      borderColor: theme.colors.tertiary,
      marginHorizontal: 6,
      marginVertical: -6,
      paddingHorizontal: 1,
      paddingVertical: 7,
      borderRightWidth: 1,
      borderLeftWidth: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    thirdArea: {
      height: '100%',
      width: '100%',
      borderColor: theme.colors.tertiary,
      borderWidth: 1,
      // backgroundColor: theme.colors.canvas,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

  return styles;
};
