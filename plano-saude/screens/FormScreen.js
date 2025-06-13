import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Picker, Alert } from 'react-native';

const estadosAtendidos = ['São Paulo', 'Minas Gerais', 'Paraná'];

export default function FormScreen({ navigation }) {
  const [idade, setIdade] = useState('');
  const [plano, setPlano] = useState('Básico');
  const [mesesAtivo, setMesesAtivo] = useState('');
  const [carencia, setCarencia] = useState('não');
  const [doencasCronicas, setDoencasCronicas] = useState('não');
  const [dependentes, setDependentes] = useState('');
  const [consultasRecentes, setConsultasRecentes] = useState('não');
  const [faturasAtraso, setFaturasAtraso] = useState('não');
  const [estado, setEstado] = useState('');

  const verificarElegibilidade = () => {
    const dados = {
      idade: Number(idade),
      plano,
      mesesAtivo: Number(mesesAtivo),
      carencia,
      doencasCronicas,
      dependentes: Number(dependentes),
      consultasRecentes,
      faturasAtraso,
      estado
    };
    navigation.navigate('Resultado', { dados });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Idade:</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={idade} onChangeText={setIdade} />

      <Text style={styles.label}>Tipo de plano:</Text>
      <Picker selectedValue={plano} onValueChange={setPlano} style={styles.input}>
        <Picker.Item label="Básico" value="Básico" />
        <Picker.Item label="Essencial" value="Essencial" />
        <Picker.Item label="Premium" value="Premium" />
      </Picker>

      <Text style={styles.label}>Meses com o plano ativo:</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={mesesAtivo} onChangeText={setMesesAtivo} />

      <Text style={styles.label}>Concluiu período de carência?</Text>
      <Picker selectedValue={carencia} onValueChange={setCarencia} style={styles.input}>
        <Picker.Item label="Sim" value="sim" />
        <Picker.Item label="Não" value="não" />
      </Picker>

      <Text style={styles.label}>Possui doenças crônicas cadastradas?</Text>
      <Picker selectedValue={doencasCronicas} onValueChange={setDoencasCronicas} style={styles.input}>
        <Picker.Item label="Sim" value="sim" />
        <Picker.Item label="Não" value="não" />
      </Picker>

      <Text style={styles.label}>Quantidade de dependentes:</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={dependentes} onChangeText={setDependentes} />

      <Text style={styles.label}>Teve consultas liberadas nos últimos 6 meses?</Text>
      <Picker selectedValue={consultasRecentes} onValueChange={setConsultasRecentes} style={styles.input}>
        <Picker.Item label="Sim" value="sim" />
        <Picker.Item label="Não" value="não" />
      </Picker>

      <Text style={styles.label}>Possui faturas em atraso?</Text>
      <Picker selectedValue={faturasAtraso} onValueChange={setFaturasAtraso} style={styles.input}>
        <Picker.Item label="Sim" value="sim" />
        <Picker.Item label="Não" value="não" />
      </Picker>

      <Text style={styles.label}>Estado onde mora:</Text>
      <TextInput style={styles.input} value={estado} onChangeText={setEstado} />

      <Button title="Verificar Benefício" onPress={verificarElegibilidade} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    padding: 5,
    marginBottom: 10,
  }
});