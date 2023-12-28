import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { UserAccount } from '../../entities/user';
import { useTheme } from '../../hooks/useTheme';
import { AppTheme } from '../../styles/themeModels';
import { useTranslation } from 'react-i18next';
import { useTranslations } from '../../hooks/useTranslations';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigators/MainStackNavigator';

type PlayGameScreenProps = NativeStackScreenProps<MainStackParamList, 'PlayGame'>;

export const PlayGameScreen = ({ navigation }: PlayGameScreenProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const user = useCurrentUser() as UserAccount;
  const { signOut } = useAuth();
  const { t } = useTranslation('user-screen')
  const { changeLanguage, tTime } = useTranslations();

  return (
    <View style={styles.container}>
      <View>
        <Text>PlayGameScreen</Text>
      </View>
    </View>
  );
};

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'green'
    }
  });

  return styles;
};

export default PlayGameScreen;

