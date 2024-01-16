import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { useTheme } from '../hooks/useTheme';
import { AppTheme } from "../styles/themeModels";
import { icons } from "../assets";
import { useAuth } from "../hooks/useAuth";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { UserAccount } from "../entities/user";
import { PaperAreaButton } from "./ButtonWrapper/PaperAreaButton";
import { useNavigation } from "@react-navigation/native";

interface BackButtonProps {
  style?: any;
}

export const BackButton = ({ style }: BackButtonProps) => {
  const styles = createStyles();
  const navigation = useNavigation();
  const user = useCurrentUser() as UserAccount;

  return (
    <PaperAreaButton
      areaStyle={styles.areaStyle}
      buttonStyle={styles.buttonStyle}
      onPress={() => navigation.goBack()}
    >
      <Image
        source={icons['back-arrow.png']}
        resizeMode="contain"
        style={styles.image}
      />
    </PaperAreaButton>
  );
};

const createStyles = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    areaStyle: {
        width: 45,
        height: 35,
    },
    buttonStyle: {
      backgroundColor: theme.colors.canvas,
    },
    image: {
      top: 10,
      width: 20,
      height: 20,
      tintColor: theme.colors.tertiary,
    }
  });

  return styles;
};
