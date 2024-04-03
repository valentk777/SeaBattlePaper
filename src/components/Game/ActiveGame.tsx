// // TODO: refactor later. Now just let's make it work
// import firebase from '@react-native-firebase/database';

// import React, { useEffect } from 'react'
// import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import { useTheme } from '../../hooks/useTheme';
// import { AppTheme } from '../../styles/themeModels';

// interface ActiveGameProps {
//     gameId: string;
// }

// export const Game = (props: ActiveGameProps) => {
//   const { theme } = useTheme();
//   const styles = createStyles(theme);

//   const { gameId } = props;

//   useEffect(() => {
//     // Stop listening for updates when no longer required
//     // return () => database().ref(`/users/${userId}`).off('value', onValueChange);
//   }, []);

//   return (
//     <View>

//     </View>
//   )
// }

// const createStyles = (theme: AppTheme) => {
//   const styles = StyleSheet.create({

//   });

//   return styles;
// };
