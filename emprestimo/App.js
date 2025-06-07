import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, Alert, TouchableOpacity } from 'react-native';

export default function App() {
  const [idade, setIdade] = useState('');
  const [rendaMensal, setRendaMensal] = useState('');
  const [scoreCredito, setScoreCredito] = useState('');
  const [ehClienteVip, setEhClienteVip] = useState(false);
  const [resultado, setResultado] = useState('');

  const validarCampos = () => {
    const idadeNum = parseInt(idade);
    const rendaNum = parseFloat(rendaMensal);
    const scoreNum = parseInt(scoreCredito);

    if (isNaN(idadeNum) || idadeNum < 0) {
      Alert.alert('Erro', 'Idade inválida');
      return false;
    }
    if (isNaN(rendaNum) || rendaNum < 0) {
      Alert.alert('Erro', 'Renda mensal inválida');
      return false;
    }
    if (isNaN(scoreNum) || scoreNum < 0) {
      Alert.alert('Erro', 'Score de crédito inválido');
      return false;
    }

    return { idadeNum, rendaNum, scoreNum };
  };

  const verificarEmprestimo = () => {
    const valores = validarCampos();
    if (!valores) return;

    const { idadeNum, rendaNum, scoreNum } = valores;

    if (
      (idadeNum >= 18 && rendaNum >= 2000 && scoreNum >= 600) ||
      (ehClienteVip && idadeNum >= 18)
    ) {
      setResultado('aprovado');
    } else {
      setResultado('negado');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simulador de Empréstimo</Text>

      <Text style={styles.label}>Idade:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={idade}
        onChangeText={setIdade}
        placeholder="Digite sua idade"
        placeholderTextColor="#777"
      />

      <Text style={styles.label}>Renda Mensal (R$):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={rendaMensal}
        onChangeText={setRendaMensal}
        placeholder="Digite sua renda"
        placeholderTextColor="#777"
      />

      <Text style={styles.label}>Score de Crédito:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={scoreCredito}
        onChangeText={setScoreCredito}
        placeholder="Digite seu score"
        placeholderTextColor="#777"
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Cliente VIP:</Text>
        <Switch
          value={ehClienteVip}
          onValueChange={setEhClienteVip}
          thumbColor={ehClienteVip ? '#888' : '#ccc'}
          trackColor={{ true: '#bbb', false: '#eee' }}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={verificarEmprestimo}>
        <Text style={styles.buttonText}>Verificar Empréstimo</Text>
      </TouchableOpacity>

      {resultado !== '' && (
        <Text
          style={[
            styles.resultado,
            { color: resultado === 'aprovado' ? '#4CAF50' : '#D32F2F' },
          ]}
        >
          Empréstimo {resultado}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    color: '#444',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#B0BEC5',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultado: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});