import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './src/contexts/ThemeContext';
import Header from './src/components/Header';
import Footer from './src/components/Footer';

// Telas
import WelcomeScreen from './src/screens/WelcomeScreen';
import LessonsScreen from './src/screens/LessonsScreen';
import DemoScreen from './src/screens/DemoScreen';
import QuizScreen from './src/screens/QuizScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={({ navigation, route }) => ({
              header: () => <Header navigation={navigation} title={route.name} />,
            })}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Lessons" component={LessonsScreen} />
            <Stack.Screen name="Demo" component={DemoScreen} />
            <Stack.Screen name="Quiz" component={QuizScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        <Footer />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});