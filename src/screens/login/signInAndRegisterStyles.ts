import {StyleSheet} from 'react-native';
import { AppTheme } from '../../styles/themeModels';
import constants from '../../constants/constants';

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: constants.screenWidth,
        height: constants.screenHeight,
      },
      mainContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '80%',
        alignItems: "center",
      },
      headerContainer: {
        width: '100%',
        flex: 2,
        alignItems: "center",
        justifyContent: 'space-evenly',
      },
      titleTextStyle: {
        fontFamily: theme.fonts.extraBold,
        fontSize: 25,
        color: theme.colors.tertiary,
        fontWeight: "600",
      },
      textInputContainer: {
        flex: 5,
        width: '100%',
        alignItems: "flex-start",
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
        borderBottomColor: theme.colors.canvas,
        borderBottomWidth: 1,
        color: theme.colors.tertiary,
      },
      signInButtonContainer: {
        flex: 1,
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
      },
      signInButtonStyle: {
        height: '60%',
        width: '80%',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
      },
      signInButtonTextStyle: {
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.tertiary,
        fontWeight: "600",
      },
      externalOptionsContainer: {
        flex: 2.5,
        width: '100%',
        alignItems: "center",
      },
      orTextArea: {
        flexDirection: "row",
        alignItems: "center",
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
      signUpButtonContainer: {
        flex: 1,
        width: '100%',
        justifyContent: "center",
        flexDirection: 'row',
      },
      signUpTextStyle: {
        fontFamily: theme.fonts.regular,
        color: theme.colors.tertiary,
        fontSize: 14,
      },
      signUpButtonStyle: {
        marginLeft: 20,
      },
      signUpButtonTextStyle: {
        fontSize: 14,
        fontFamily: theme.fonts.semiBold,
        color: theme.colors.tertiary,
      },
  });

  return styles;
};

export default createStyles;