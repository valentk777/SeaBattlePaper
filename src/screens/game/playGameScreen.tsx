import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigators/MainStackNavigator';
import { Background } from '../../components/Background/BackgroundImage';
import { Game } from '../../entities/game';
import gameService from '../../services/gameService';
import { GameProgress } from '../../entities/gameProgress';
import Board from '../../components/Board/Board';
import { BoardItem } from '../../entities/boardItem';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { PlayerPosition } from '../../entities/playerPosition';
import shipBoardService from '../../services/shipBoardService';

type PlayGameScreenProps = NativeStackScreenProps<MainStackParamList, 'PlayGame'>;

export const PlayGameScreen = ({ navigation, route }: PlayGameScreenProps) => {
    const styles = createStyles();

    const { gameId, playerPosition } = route.params;

    const [activeGame, setActiveGame] = useState({ id: gameId } as Game);



    //   const user = useCurrentUser();
    //   const playerPosition = gameService.getPlayerPosition(game, user.id)

    const [myBoard, setMyBoard] = useState(shipBoardService.generateNewShipBoard());
    const [opponentBoard, setOpponentBoard] = useState(shipBoardService.generateNewShipBoard());

    const [opponentAttackedShips, setOpponentAttackedShips] = useState([] as string[]);
    const [myAttackedShips, setMyAttackedShips] = useState([] as string[]);
    const [myMarkedShips, setMyMarkedShips] = useState([] as string[]);



    //   const user = useCurrentUser() as UserAccount;

    const onRemoteGameUpdated = async (game: Game) => {
        Alert.alert("Remote game updated")
        // await gameService.updateGameInLocalStorage(game);

        setActiveGame(game);
    };

    useEffect(() => {
        const createNewGameAsync = async () => {
            try {
                console.log("try to create game");
                const initialGame = await gameService.getGameWithTracking(gameId, onRemoteGameUpdated);
                setOpponentAttackedShips(playerPosition === PlayerPosition.PlayerA ? initialGame?.playerB?.attackedShips : initialGame.playerA.attackedShips);
                setMyAttackedShips(playerPosition === PlayerPosition.PlayerA ? initialGame?.playerA?.attackedShips : initialGame.playerB.attackedShips);
                setMyMarkedShips(playerPosition === PlayerPosition.PlayerA ? initialGame?.playerA?.markedShips : initialGame.playerB.markedShips);

            } catch (error) {
                console.error('Error creating a new game:', error);
            }
        };

        createNewGameAsync();
    }, []);

    const onBoardTilePress = (selectedBox: BoardItem) => {
        setMyAttackedShips(oldArray => [...oldArray, selectedBox.location]);


        setMyBoard(oldBoard => {
            return oldBoard.map((item) => {
                if (item.location === selectedBox.location) {
                    return { ...item, isShip: !item.isShip };
                } else {
                    return item;
                }
            });
        });
    };



    //   const values = useMemo(() => ({ game: activeGame, updateGame: updateGame }), [activeGame]);

    const renderMainGame = () => (
        <View style={styles.mainGame} >
            <View style={styles.empty} />
            <View style={styles.competitorShipBoardContainer}>
                {/* <Board disabled={true} board={activeGame.playerA} onPress={function (neweItem: BoardItem): void {
                    throw new Error('Function not implemented.');
                }} /> */}
            </View>
            <View style={styles.myShipBoardContainer}>
                <Board disabled={false} board={myBoard} onPress={onBoardTilePress} />
            </View>
        </View>
    );

    const renderSpinningWheel = () => (
        <View style={styles.spinningWheel}>
            <Text style={styles.spinningWheelText}>Another player is not ready</Text>
        </View>
    );

    const renderScreenChange = () => {
        console.log(activeGame);

        if (activeGame?.status === GameProgress.Started) {
            return (
                renderMainGame()
            )
        } else {
            return (
                renderSpinningWheel()
            )
        }
    };

    return (
        <View style={styles.container}>
            <Background />
            {/* <ActiveGameContext.Provider value={values}> */}
            {renderScreenChange()}
            {/* </ActiveGameContext.Provider> */}
        </View>
    );
};

const createStyles = () => {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        mainGame: {
            flex: 1,
        },
        spinningWheel: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        spinningWheelText: {
            fontSize: 20,
            fontFamily: theme.fonts.bold,
            color: theme.colors.tertiary,
            textAlign: 'center'
        },
        competitorShipBoardContainer: {
            flex: 5,
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'none',
        },
        myShipBoardContainer: {
            flex: 5,
            justifyContent: 'center',
            alignItems: 'center',
        },
        empty: {
            flex: 1,
        },
    });

    return styles;
};

export default PlayGameScreen;

