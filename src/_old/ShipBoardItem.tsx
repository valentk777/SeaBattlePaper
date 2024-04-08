// import React, { memo, useCallback, useEffect } from "react";
// import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { useTheme } from '../../hooks/useTheme';
// import constants from '../../constants/constants';
// import { BoardItem } from '../../entities/boardItem';
// import gameService from "../../services/gameService";

// type ShipBoardItemProps = {
//   item: BoardItem
//   onPress: (item: BoardItem) => void;
// };

// const ShipBoardItem = ({
//   item,
//   onPress,
// }: ShipBoardItemProps) => {
//   const styles = createStyles();

//   // useEffect(() => {
//   //   console.log("Data has changed");
//   // }, [item]);


//   // const game = await gameService.getGameFromStorage(gameId);

//   // const onPress = useCallback(() => setValue(item.key), []);


//   console.log(`Rerending this item: ${item.key}`);

//   return (
//     <TouchableOpacity
//       // disabled={item.isFixed}
//       style={[styles.gridItemButtom, item.isShip ? styles.ship : null]}
//       onPress={setValue}
//     >
//       {/* <View style={[item.isFixed ? styles.symbolTileContainer : null]}>
//         <Text style={[item.isFixed ? styles.symbolTileText : null]}>{item.value}</Text>
//       </View> */}
//     </TouchableOpacity>
//   )
// };

// export default memo(ShipBoardItem);

// const createStyles = () => {
//   const { theme } = useTheme();

//   const styles = StyleSheet.create({
//     gridItemButtom: {
//       height: constants.BOARD_CELL_LENGHT,
//       width: constants.BOARD_CELL_LENGHT,
//       borderColor: theme.colors.canvasInverted,
//       borderWidth: 0.5,
//       backgroundColor: theme.colors.canvas,
//     },
//     ship: {
//       backgroundColor: theme.colors.tertiary,
//     },
//     symbolTileContainer: {
//       alignItems: 'center',
//       justifyContent: 'center',
//       alignSelf: 'center',
//       height: '100%',
//       width: '100%',
//       backgroundColor: theme.colors.primary,
//     },
//     symbolTileText: {
//       fontSize: 18,
//       color: theme.colors.tertiary,
//       fontFamily: theme.fonts.medium,
//     }
//   });

//   return styles;
// };
