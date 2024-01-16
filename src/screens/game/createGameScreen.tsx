import React, { useContext, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { Game } from '../../entities/game';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigators/MainStackNavigator';
import { Background } from '../../components/Background/BackgroundImage';
import { ShipsBoard } from '../../components/Game/ShipsBoard';
import { PaperArea } from '../../components/Background/PaperArea';
import gameService from '../../services/gameService';
import { UserAccount } from '../../entities/user';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { ActiveGameContext } from '../../hooks/useActiveGame';

type CreateGameScreenProps = NativeStackScreenProps<MainStackParamList, 'CreateGame'>;

export const CreateGameScreen = ({ navigation }: CreateGameScreenProps) => {
  const styles = createStyles();

  const [activeGame, onChangeActiveGame] = useState({ id: "" } as Game);
  const user = useCurrentUser() as UserAccount;

  useEffect(() => {
    const createNewGameAsync = async () => {
      try {
        await gameService.createNewGame(user.id, onChangeActiveGame);
      } catch (error) {
        // Handle errors here, e.g., log them or show an error message.
        console.error('Error creating a new game:', error);
      }
    };

    createNewGameAsync();
  }, []);

  const values = useMemo(() => ({ game: activeGame, updateGame: onChangeActiveGame }), [activeGame]);
  
  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.empty} />
      <ActiveGameContext.Provider value={values}>
      <View style={styles.newGameContainer}>
        <PaperArea
          areaStyle={styles.areaStyle}
          componentStyle={styles.componentStyle}
        >
          <Text style={styles.shareText}>Share this number with another player to start a game</Text>
          <Text style={styles.activeGameIdText}>{activeGame.id}</Text>
        </PaperArea>
      </View>
      <View style={styles.shipBoardContainer}>
        <ShipsBoard/>
      </View>
      </ActiveGameContext.Provider>
    </View>
  );
};

const createStyles = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    empty: {
      flex: 1,
    },
    newGameContainer: {
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    areaStyle: {
      height: '70%',
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
    shipBoardContainer: {
      flex: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return styles;
};

export default CreateGameScreen;

