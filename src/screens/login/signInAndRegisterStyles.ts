import {StyleSheet} from 'react-native';
import {useTheme} from '../../hooks/useTheme';

const createStyles = () => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      width: '100%',
    },
    mainContainer: {
      flex: 1,
      flexDirection: 'column',
      width: '80%',
      alignItems: 'center',
    },
    headerContainer: {
      width: '100%',
      flex: 2,
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    titleTextStyle: {
      fontFamily: theme.fonts.extraBold,
      fontSize: 25,
      color: theme.colors.tertiary,
    },
    textInputContainer: {
      flex: 5,
      width: '100%',
      alignItems: 'flex-start',
    },
    paperArea: {
      height: '90%',
      width: '100%',
    },
    inputArea: {
      flex: 1,
      width: '80%',
      paddingTop: '7%',
    },
    inputText: {
      fontFamily: theme.fonts.bold,
      color: theme.colors.tertiary,
    },
    textInputStyle: {
      fontFamily: theme.fonts.medium,
      padding: 0,
      borderBottomColor: theme.colors.canvasInverted,
      borderBottomWidth: 1,
      color: theme.colors.tertiary,
    },
    LoginButtonContainer: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    LoginButtonAreaStyle: {
      height: 45,
      width: '80%',
    },
    LoginButtonStyle: {
      backgroundColor: theme.colors.primary,
    },
    LoginButtonTextStyle: {
      fontFamily: theme.fonts.semiBold,
      color: theme.colors.tertiary,
    },
    externalOptionsContainer: {
      flex: 2.5,
      width: '100%',
      alignItems: 'center',
    },
    orTextArea: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 18,
    },
    horizontalLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.tertiary,
    },
    orTextStyle: {
      fontSize: 17,
      fontFamily: theme.fonts.regular,
      color: theme.colors.tertiary,
      paddingRight: 20,
      paddingLeft: 20,
    },
    questionContainer: {
      paddingTop: 10,
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    questionText: {
      fontFamily: theme.fonts.regular,
      color: theme.colors.tertiary,
      fontSize: 14,
    },
    questionButtonStyle: {
      marginLeft: 20,
    },
    questionButtonText: {
      fontSize: 14,
      fontFamily: theme.fonts.semiBold,
      color: theme.colors.tertiary,
    },
  });

  return styles;
};

export default createStyles;
