import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, StatusBar, StyleSheet, Text } from "react-native";
import { Game } from "../entities/game";
import { MainStackParamList } from "./MainStackNavigator";
import { useTheme } from "../hooks/useTheme";
import { PaperArea } from "../components/Background/PaperArea";
import { BackButton } from "../components/BackButton";
import { MarkButton } from "../components/MarkButton";

interface ActiveGameHeaderProps {
  game: Game;
  navigation: NativeStackNavigationProp<MainStackParamList, "PlayGame", undefined>;
  isYourTurn: boolean;
  isMarkingMode: boolean;
  onMarkingMode: () => void;
}

export const ActiveGameHeader = ({ game, navigation, isYourTurn, isMarkingMode, onMarkingMode }: ActiveGameHeaderProps) => {
  const styles = createStyles();

  // if (isMarkingMode === true)





  return (
    <View style={styles.container}>
      <BackButton style={styles.back} onPress={() => navigation.navigate("Home")} />
      <PaperArea
        areaStyle={styles.turnSection}
        componentStyle={styles.turnSectionComponentStyle}
      >
        {isMarkingMode === true
          ? (<Text style={styles.turnText}>Marking mode!</Text>)
          : (isYourTurn === true
            ? (<Text style={styles.turnText}>Game: {game.id}. Your turn!</Text>)
            : (<Text style={styles.turnText}>Game: {game.id}. Another player turn!</Text>)
          )}
      </PaperArea>
      <MarkButton style={styles.mark} onPress={onMarkingMode} />
    </View>
  )
};

const createStyles = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      top: StatusBar.currentHeight / 2,
    },
    back: {
      left: 15,
      position: "absolute",
    },
    turnSection: {
      height: 35,
      width: 250,
      alignSelf: 'center',
      position: "absolute",
    },
    turnSectionComponentStyle: {
      backgroundColor: theme.colors.canvas,
    },
    turnText: {
      fontSize: 14,
      fontFamily: theme.fonts.medium,
      color: theme.colors.tertiary,
      textAlign: 'center',
    },
    mark: {
      position: "absolute",
      right: 15,
    },
  });

  return styles;
};
