import {StyleSheet} from 'react-native';
import {useTheme} from '../../hooks/useTheme';

const createStyles = () => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    empty: {
      flex: 1,
    },
    newGameContainer: {
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    areaStyle: {
      height: '65%',
      width: '80%',
    },
    componentStyle: {
      backgroundColor: theme.colors.canvas,
    },
    shareText: {
      fontSize: 15,
      fontFamily: theme.fonts.regular,
      color: theme.colors.tertiary,
      textAlign: 'center',
    },
    activeGameIdText: {
      fontSize: 30,
      fontFamily: theme.fonts.extraBold,
      color: theme.colors.tertiary,
      textAlign: 'center',
    },
    gamePlayers: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    shipBoardContainer: {
      flex: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    startButtonArea: {
      flex: 1,
      width: '80%',
      alignSelf: 'center',
    },
    startButton: {
      backgroundColor: theme.colors.canvas,
    },
    startButtonText: {
      fontSize: 15,
      fontFamily: theme.fonts.medium,
      color: theme.colors.tertiary,
      textAlign: 'center',
    },
    activePlayersText: {
      fontSize: 15,
      fontFamily: theme.fonts.regular,
      color: theme.colors.tertiary,
      textAlign: 'center',
    },
  });

  return styles;
};

export default createStyles;
