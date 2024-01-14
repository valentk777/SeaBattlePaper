import {StyleSheet} from 'react-native';
import { AppTheme } from '../styles/themeModels';
import constants from '../constants/constants';

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
      height: constants.screenHeight,
    },
    titleContainer: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      fontFamily: theme.fonts.bold,
      color: theme.colors.tertiary,
      fontSize: 25,
    },
    options: {
      flex: 3,
      alignItems: 'center',
    },
    hostOptions: {
      flex: 2,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    button: {
      backgroundColor: theme.colors.canvas,
      width: '80%',
      height: 45,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.secondary,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontFamily: theme.fonts.medium,
      color: theme.colors.tertiary,
    },
    orArea: {
      flex: 2,
      justifyContent: "center",
    },
    orText: {
      fontFamily: theme.fonts.medium,
      color: theme.colors.tertiary,
      justifyContent: "center",
    },
    joinOptions: {
      flex: 3,
      width: '100%',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    codeFieldRoot: {
      height: 45,
      width: '80%',
      justifyContent: "center",
    },
    cell: {
      width: 45,
      height: 45,
      backgroundColor: theme.colors.canvas,
      marginHorizontal: 5,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.secondary,
      justifyContent: "center",
      alignItems: "center",
      lineHeight: 45,
      textAlign: 'center',
      fontFamily: theme.fonts.light,
      color:theme.colors.tertiary,
      fontSize: 20,
    },
    focusCell: {
      borderColor: theme.colors.tertiary,
    },
    empty: {
      flex: 3,
    },
  });

  return styles;
};

export default createStyles;