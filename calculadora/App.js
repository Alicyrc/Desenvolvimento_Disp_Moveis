import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [resultado, setResultado] = useState(null);

  const somar = () => {
    const numero1 = parseFloat(num1);
    const numero2 = parseFloat(num2);
    
    if (!isNaN(numero1) && !isNaN(numero2)) {
      setResultado(numero1 + numero2);
    } else {
      setResultado('Entrada inválida');
    }
  };

  const limparCampos = () => {
    setNum1('');
    setNum2('');
    setResultado(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de Soma</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Digite o primeiro número"
        keyboardType="numeric"
        value={num1}
        onChangeText={setNum1}
      />

      <TextInput
        style={styles.input}
        placeholder="Digite o segundo número"
        keyboardType="numeric"
        value={num2}
        onChangeText={setNum2}
      />
      
      <TouchableOpacity style={styles.button} onPress={somar}>
        <Text style={styles.buttonText}>Somar</Text>
      </TouchableOpacity>
      
      {resultado !== null && (
        <Text style={styles.resultado}>Resultado: {resultado}</Text>
      )}
      
      <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={limparCampos}>
        <Text style={styles.buttonText}>Limpar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#e0f7fa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#00796b",
  },
  input: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#00796b",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: "#ffffff",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: "#00796b",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonClear: {
    backgroundColor: "#d32f2f",
    padding: 15,
    borderRadius: 8,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  result: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "#00796b",
  },
});

export default App;