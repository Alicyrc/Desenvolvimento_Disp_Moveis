import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function TaskInput({ onAddTask }) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    onAddTask(text);
    setText('');
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Digite uma tarefa"
        style={styles.input}
        value={text}
        onChangeText={setText}
      />
      <Button title="Adicionar" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#999',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: '#fff',
  },
});
