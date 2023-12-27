import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { UserAccount } from '../entities/user';
import { useTheme } from '../hooks/useTheme';
import { AppTheme } from '../styles/themeModels';
import { useTranslation } from 'react-i18next';
import { useTranslations } from '../hooks/useTranslations';

export const HomeScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const user = useCurrentUser() as UserAccount;
  const { signOut } = useAuth();
  const { t } = useTranslation('user-screen')
  const { changeLanguage, tTime } = useTranslations();

  return (
    <View style={styles.container}>
    </View>
  );
};

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
  });

  return styles;
};

export default HomeScreen;

