import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { UserAccount } from '../../entities/user';
import { useTheme } from '../../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { useTranslations } from '../../hooks/useTranslations';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigators/MainStackNavigator';
import { Background } from '../../components/Background/BackgroundImage';

type GameSetupScreenProps = NativeStackScreenProps<MainStackParamList, 'GameSetup'>;

export const GameSetupScreen = ({ navigation }: GameSetupScreenProps) => {
  const styles = createStyles();

  const user = useCurrentUser() as UserAccount;
  const { signOut } = useAuth();
  const { t } = useTranslation('user-screen')
  const { changeLanguage, tTime } = useTranslations();

  return (
    <View style={styles.container}>
      <Background />
      <View>
        <Text>GameSetupScreen</Text>
      </View>
    </View>
  );
};

const createStyles = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'green'
    }
  });

  return styles;
};

export default GameSetupScreen;

