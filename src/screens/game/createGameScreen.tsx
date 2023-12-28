import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { UserAccount } from '../../entities/user';
import { useTheme } from '../../hooks/useTheme';
import { AppTheme } from '../../styles/themeModels';
import { useTranslation } from 'react-i18next';
import { useTranslations } from '../../hooks/useTranslations';

export const CreateGameScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const user = useCurrentUser() as UserAccount;
  const { signOut } = useAuth();
  const { t } = useTranslation('user-screen')
  const { changeLanguage, tTime } = useTranslations();

  // generate game number 4 numbers
  // this number should be stored in database and validated that this number does not exist yet. it can be incremental or random
  

  return (
    <View style={styles.container}>
      <View>
        <Text>CreateGameScreen</Text>
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

export default CreateGameScreen;

