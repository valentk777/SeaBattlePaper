import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { UserAccount } from '../../entities/user';
import { useTheme } from '../../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { useTranslations } from '../../hooks/useTranslations';
import gameService from '../../services/gameService';
import { Game } from '../../entities/game';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigators/MainStackNavigator';
import { Background } from '../../components/Background/BackgroundImage';

type CreateGameScreenProps = NativeStackScreenProps<MainStackParamList, 'CreateGame'>;

export const CreateGameScreen = ({ navigation }: CreateGameScreenProps) => {
  const styles = createStyles();

  const [activeGame, onChangeActiveGame] = useState({ id: "" } as Game);

  const user = useCurrentUser() as UserAccount;
  const { signOut } = useAuth();
  const { t } = useTranslation('user-screen')
  const { changeLanguage, tTime } = useTranslations();

  useEffect(() => {
    gameService.createNewGame(user.id, onChangeActiveGame);
  }, []);

  return (
    <View style={styles.container}>
      <Background />
      <View>
        <Text>Share this number with another player to start a game</Text>
        <Text>{activeGame.id}</Text>
      </View>
    </View>
  );
};

const createStyles = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
  });

  return styles;
};

export default CreateGameScreen;

