import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onRemoveTask }) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskItem item={item} onRemove={() => onRemoveTask(item.id)} />
      )}
      ListEmptyComponent={<Text style={styles.empty}>Nenhuma tarefa adicionada.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});
