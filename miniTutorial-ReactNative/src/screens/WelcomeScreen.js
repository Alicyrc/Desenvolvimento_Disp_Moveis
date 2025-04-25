import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const WelcomeScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Bem-vindo ao Tutorial React Native!</Text>
      <Text style={[styles.description, { color: colors.text }]}>
        Este aplicativo foi criado para te ajudar a aprender os conceitos básicos do React Native.
      </Text>
      <Button
        title="Começar Lições"
        onPress={() => navigation.navigate('Lessons')}
        color={colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default WelcomeScreen;