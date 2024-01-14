import React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from '../hooks/useTheme';
import { AppTheme } from "../styles/themeModels";
import { icons } from "../assets";
import { CircleButton } from "./ButtonWrapper/CircleButton";
import { useAuth } from "../hooks/useAuth";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { UserAccount } from "../entities/user";

interface LogOutButtonProps {
  style?: any;
}

export const LogOutButton = ({ style }: LogOutButtonProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { signOut } = useAuth();
  const user = useCurrentUser() as UserAccount;

  return (
    <CircleButton
      imgUrl={icons['logout.png']}
      onPress={() => signOut(user.id)}
      style={{ ...style }}
    />
  );
};

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({

  });

  return styles;
};
