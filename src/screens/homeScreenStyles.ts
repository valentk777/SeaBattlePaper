import {StyleSheet} from 'react-native';
import constants from '../constants/constants';
import {useTheme} from '../hooks/useTheme';

const createStyles = () => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      height: constants.SCREEN_HEIGHT,
    },
    titleContainer: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
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
      alignItems: 'center',
    },
    areaStyle: {
      width: '80%',
      height: 45,
    },
    buttonStyle: {
      backgroundColor: theme.colors.canvas,
    },
    buttonText: {
      fontFamily: theme.fonts.bold,
      color: theme.colors.tertiary,
    },
    orArea: {
      flex: 2,
      justifyContent: 'center',
    },
    orText: {
      fontFamily: theme.fonts.medium,
      color: theme.colors.tertiary,
      justifyContent: 'center',
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
      justifyContent: 'center',
    },
    inputArea: {
      marginHorizontal: '3%',
      width: 45,
      height: 45,
    },
    inputComponent: {
      backgroundColor: theme.colors.canvas,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputText: {
      width: '100%',
      height: '100%',
      lineHeight: 40, //TODO: think about this part
      textAlign: 'center',
      fontFamily: theme.fonts.medium,
      color: theme.colors.tertiary,
      fontSize: 22,
    },
    focusCell: {},
    empty: {
      flex: 3,
    },
  });

  return styles;
};

export default createStyles;
