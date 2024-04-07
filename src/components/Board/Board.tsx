import React, { memo, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useTheme } from '../../hooks/useTheme';
import constants from '../../constants/constants';
import { PaperArea } from '../Background/PaperArea';
import { BoardItem } from '../../entities/boardItem';
import shipBoardService from '../../services/shipBoardService';
import BoardPresentationTile from './BoardPresentationTile';

interface ShipsBoardProps {
  board: BoardItem[];
  renderItem: (item: BoardItem) => any;
  disabled: boolean;
  // heightPercent?: float;
}

const Board = ({ board, renderItem, disabled }: ShipsBoardProps) => {
  const styles = createStyles();

  const [letters, setLetters] = useState(shipBoardService.generateLetters());
  const [numbers, setNumbers] = useState(shipBoardService.generateNumbers());

  return (
    <View style={[disabled ? styles.disabled : null, styles.container]}>
      <PaperArea
        areaStyle={styles.areaStyle}
        componentStyle={styles.componentStyle}
      >
        <View style={styles.grid}>
          <View style={styles.bodyRow}>
            <View style={styles.cornerBox} />
            <FlatList
              data={letters}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (<BoardPresentationTile text={item} />)}
              numColumns={10}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              refreshing={false}
              initialNumToRender={10}
              scrollEnabled={false}
            />
          </View>
          <View style={styles.bodyRow}>
            <View style={styles.numbers}>
              <FlatList
                data={numbers}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (<BoardPresentationTile text={item} />)}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                refreshing={false}
                initialNumToRender={10}
                scrollEnabled={false}
              />
            </View>
            <View style={styles.mainArea}>
              <FlatList
                data={board}
                keyExtractor={(item) => item.location}
                renderItem={({ item }) => renderItem(item)}
                numColumns={10}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                refreshing={false}
                initialNumToRender={100}
                scrollEnabled={false}
              />
            </View>
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
    numbers: {
      height: constants.BOARD_FULL_LENGHT,
      width: constants.BOARD_CELL_LENGHT
    },
    cornerBox: {
      backgroundColor: theme.colors.primary,
      height: constants.BOARD_CELL_LENGHT,
      width: constants.BOARD_CELL_LENGHT,
    },
    disabled: {
      pointerEvents: 'none',
    },
    mainArea: {
      height: constants.BOARD_ACTIVE_LENGHT,
      width: constants.BOARD_ACTIVE_LENGHT
    }
  });

  return styles;
};

export default memo(Board);