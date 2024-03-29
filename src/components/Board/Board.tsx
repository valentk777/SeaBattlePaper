import React, { memo, useCallback, useMemo, useState } from "react";
import { FlatList, Pressable, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { BoardItem } from "../../entities/boardItem";
import constants from '../../constants/constants';
import { useTheme } from '../../hooks/useTheme';
import { FlashList } from "@shopify/flash-list";
import { PaperArea } from '../Background/PaperArea';
import shipBoardService from '../../services/shipBoardService';

interface BoardProps {
  board: BoardItem[];
  onPress: (selectedBox: BoardItem) => void;
  disabled: boolean;
  style?: any;
}

const BoardActiveTile = ({ item, onPress }) => {
  const styles = createStyles();

  return (
    <Pressable
      style={[styles.gridItemButtom, item.isShip ? styles.ship : null]}
      onPress={onPress} />
  )
};

const BoardDecorationTile = ({  text}) => {
  const styles = createStyles();

  return (
    <Pressable
      disabled={true}
      style={styles.gridItemButtom}
    >
      <View style={styles.symbolTileContainer}>
        <Text style={styles.symbolTileText}>{text}</Text>
      </View>
    </Pressable>
  )
};

const Board = ({ board, onPress, disabled, style }: BoardProps) => {
  const styles = createStyles();

  const [letters] = useState(shipBoardService.generateLetters);
  const [numbers] = useState(shipBoardService.generateNumbers);

  const renderBodyItem = ({ item }) => (<BoardDecorationTile text={item} />);

  const renderboardItem = ({ item }) => (<BoardActiveTile item={item} onPress={() => onPress(item)} />);

  const RenderBoardLetters = () => {
    return (
      <View style={styles.bodyRow}>
        <View style={styles.cornerBox} />
        <FlatList
          data={letters}
          renderItem={renderBodyItem}
          numColumns={10}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshing={false}
          scrollEnabled={false}
          // estimatedItemSize={constants.BOARD_CELL_LENGHT}
          horizontal={false}
          // disableAutoLayout={true}
        />
      </View>
    )
  };

  const RenderBoardNumbers = () => {
    return (
      <View style={{ height: constants.BOARD_FULL_LENGHT, width: constants.BOARD_CELL_LENGHT, }}>
        <FlatList
          data={numbers}
          renderItem={renderBodyItem}
          numColumns={1}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshing={false}
          scrollEnabled={false}
          // estimatedItemSize={constants.BOARD_CELL_LENGHT}
          horizontal={false}
          // disableAutoLayout={true}
        />
      </View>
    )
  };

  const RenderActiveBoard = () => {
    return (
      <View style={{ height: constants.BOARD_ACTIVE_LENGHT, width: constants.BOARD_ACTIVE_LENGHT, }}>
        <FlatList
          data={board}
          renderItem={renderboardItem}
          numColumns={10}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshing={false}
          scrollEnabled={false}
          // estimatedItemSize={constants.BOARD_CELL_LENGHT}
          horizontal={false}
          // disableAutoLayout={true}
        />
      </View>
    )
  };

  return (
    <View style={[disabled ? styles.disabled : null, styles.container, style]}>
      <PaperArea
        areaStyle={styles.areaStyle}
        componentStyle={styles.componentStyle}
      >
        <View style={styles.grid}>
          <RenderBoardLetters />
          <View style={styles.bodyRow}>
            <RenderBoardNumbers />
            <RenderActiveBoard />


          </View>
        </View>
      </PaperArea>
    </View>
  )
};



const createStyles = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
    },
    areaStyle: {
      height: constants.BOARD_FULL_LENGHT + 6,
      width: constants.BOARD_FULL_LENGHT + 18,
    },
    componentStyle: {
      backgroundColor: theme.colors.canvasInverted,
      height: '100%'
    },
    grid: {
      height: constants.BOARD_FULL_LENGHT,
      width: constants.BOARD_FULL_LENGHT,
    },
    bodyRow: {
      flexDirection: 'row',
    },
    cornerBox: {
      backgroundColor: theme.colors.primary,
      height: constants.BOARD_CELL_LENGHT,
      width: constants.BOARD_CELL_LENGHT,
    },
    disabled: {
      pointerEvents: 'none',
    },
    gridItemButtom: {
      height: constants.BOARD_CELL_LENGHT,
      width: constants.BOARD_CELL_LENGHT,
      borderColor: theme.colors.canvasInverted,
      borderWidth: 0.5,
      backgroundColor: theme.colors.canvas,
    },
    ship: {
      backgroundColor: theme.colors.tertiary,
    },
    symbolTileContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      height: '100%',
      width: '100%',
      backgroundColor: theme.colors.primary,
    },
    symbolTileText: {
      fontSize: 18,
      color: theme.colors.tertiary,
      fontFamily: theme.fonts.medium,
    }
  });

  return styles;
};

export default memo(Board);