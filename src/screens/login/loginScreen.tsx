import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import { Text, View, Image, Animated } from 'react-native';
import { AuthStackParamList } from '../../navigators/AuthStackNavigator';
import { logo } from '../../assets';
import { Background } from '../../components/Background/BackgroundImage';
import { PaperAreaButton } from '../../components/ButtonWrapper/PaperAreaButton';
import createStyles from './loginScreenStyles';
import { PaperArea } from '../../components/Background/PaperArea';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'LoginScreen'>;

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const styles = createStyles();
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
      <PaperArea areaStyle={styles.areaStyle}
        componentStyle={styles.componentStyle}
      >
        {renderHeaderContainer()}
        <View style={styles.buttonContainer}>
          <PaperAreaButton
            areaStyle={styles.register}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            onPress={() => navigation.navigate('RegisterScreen', {})}
            text={'Register'}
          >
          </PaperAreaButton>
          <PaperAreaButton
            areaStyle={styles.signIn}
            buttonStyle={styles.button}
            textStyle={styles.buttonText}
            onPress={() => navigation.navigate('SingInScreen', {})}
            text={'Sign In'}
          >
          </PaperAreaButton>
        </View>
      </PaperArea>
    </View >
  );
};

export default LoginScreen;
