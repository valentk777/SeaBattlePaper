import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Animated } from 'react-native';
import { AppTheme } from '../../styles/themeModels';
import { AuthStackParamList } from '../../navigators/AuthStackNavigator';
import { logo } from '../../assets';
import { useTheme } from '../../hooks/useTheme';
import { Background } from '../../components/Background/BackgroundImage';
import { PaperAreaWithGradient } from '../../components/Background/PaperAreaWithGradient';
import { PaperAreaButton } from '../../components/ButtonWrapper/PaperAreaButton';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'LoginScreen'>;

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const renderHeaderContainer = () => (
    <Animated.View style={[styles.headerContainer, { opacity: fadeAnim }]}>
      <Image
        style={styles.image}
        source={logo['app_logo.png']}
      />
      <Text style={styles.text}>Sea Battle Paper</Text>
    </Animated.View>
  );

  return (
    <View style={styles.global}>
      <Background />
      <PaperAreaWithGradient style={{
        width: '80%',
        height: '80%',
      }}>
        {renderHeaderContainer()}
        <View style={styles.buttonContainer}>
          <PaperAreaButton
            areaStyle={styles.register}
            onPress={() => navigation.navigate('RegisterScreen', {})}
            text={'Register'}
            textStyle={styles.bottomText}
            buttonColor={theme.colors.canvas}
          >
          </PaperAreaButton>
          <PaperAreaButton
            areaStyle={styles.signIn}
            onPress={() => navigation.navigate('SingInScreen', {})}
            text={'Sign In'}
            textStyle={styles.bottomText}
            buttonColor={theme.colors.canvas}
          >
          </PaperAreaButton>
        </View>
      </PaperAreaWithGradient>
    </View >
  );
};

const createStyles = (theme: AppTheme) => {
  const styles = StyleSheet.create({
    global: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      height: '70%',
    },
    buttonContainer: {
      flex: 1,
      paddingLeft: '10%',
      paddingRight: '10%',
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    image: {
      width: '40%',
      height: undefined,
      aspectRatio: 1,
      borderRadius: 20,
    },
    text: {
      fontSize: 20,
      lineHeight: 30,
      fontFamily: theme.fonts.bold,
      color: theme.colors.tertiary,
      marginTop: 30,
    },
    register: {
      height: 50,
      width: '45%',
    },
    signIn: {
      height: 50,
      width: '45%',
    },
    center: {
      flex: 1,
      justifyContent: 'center',
    },
    bottomText: {
      fontSize: 18,
      color: theme.colors.tertiary,
      fontFamily: theme.fonts.medium,
      fontWeight: '600'
    }
  });

  return styles;
};

export default LoginScreen;
