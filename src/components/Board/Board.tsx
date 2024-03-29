import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from 'react-native';
import { BoardItem } from "../../entities/boardItem";
import shipBoardService from "../../services/shipBoardService";

interface BoardProps {
    board: BoardItem[];
    onPress: (selectedBox: BoardItem) => void;
    disabled: boolean;
    style?: any;
  }

const MyItem = ({ item, onPress }) => (
    <Pressable onPress={onPress}>
      <Text style={{fontSize: item.fontSize}}>{item.key}</Text>
    </Pressable>
  );
  
  export const Board = ({ board, onPress,  disabled, style }: BoardProps) => {
    // const [data, setData] = useState(Array.from({length: 100}, (_, i) => ({ key: String.fromCharCode(65 + i), fontSize: 14 })));
  
    // const [locations] = useState(shipBoardService.generateNewShipBoardLocations);
    const [letters] = useState(shipBoardService.generateLetters);
    const [numbers] = useState(shipBoardService.generateNumbers);
  
    return (
      <FlatList
        data={board}
        numColumns={10}
        renderItem={({ item }) => (
          <MyItem item={item} onPress={() => onPress(item)} />
        )}
      />
    );
  };
  
  export default Board;
  
  