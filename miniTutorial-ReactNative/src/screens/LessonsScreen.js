import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const lessons = [
  { id: '1', title: 'O que é React Native', icon: 'information-circle' },
  { id: '2', title: 'Componentes Básicos', icon: 'cube' },
  { id: '3', title: 'States e Props', icon: 'swap-vertical' },
  { id: '4', title: 'Estilização Simples', icon: 'brush' },
  { id: 'quiz', title: 'Teste seus Conhecimentos', icon: 'help-circle', isQuiz: true },
];

const LessonsScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: colors.primary }]}
      onPress={() => {
        if (item.isQuiz) {
          navigation.navigate('Quiz');
        } else {
          navigation.navigate('Demo', { lessonId: item.id });
        }
      }}
    >
      <Ionicons name={item.icon} size={24} color="white" />
      <Text style={styles.itemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Lições Disponíveis</Text>
      <FlatList
        data={lessons}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  itemText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default LessonsScreen;