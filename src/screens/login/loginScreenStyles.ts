import {StyleSheet} from 'react-native';
import {useTheme} from '../../hooks/useTheme';

const createStyles = () => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    global: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    areaStyle: {
      width: '80%',
      height: '80%',
    },
    componentStyle: {
      backgroundColor: theme.colors.canvas,
    },
    headerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '70%',
    },
    buttonContainer: {
      flex: 1,
      paddingHorizontal: '5%',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    image: {
      width: '40%',
      height: undefined,
      aspectRatio: 1,
      borderRadius: 20,
    },
    text: {
      fontSize: 20,
      lineHeight: 30,
      fontFamily: theme.fonts.bold,
      color: theme.colors.tertiary,
      marginTop: 30,
    },
    register: {
      height: 50,
      width: '45%',
      paddingRight: 5,
    },
    signIn: {
      height: 50,
      width: '45%',
      paddingLeft: 5,
    },
    center: {
      flex: 1,
      justifyContent: 'center',
    },
    button: {
      backgroundColor: theme.colors.primary,
    },
    buttonText: {
      fontSize: 18,
      color: theme.colors.tertiary,
      fontFamily: theme.fonts.medium,
    },
  });

  return styles;
};

export default createStyles;
