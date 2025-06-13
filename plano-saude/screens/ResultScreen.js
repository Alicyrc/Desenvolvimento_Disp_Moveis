import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ResultScreen({ route, navigation }) {
  const { dados } = route.params;

  const verificarRegras = () => {
    if (dados.idade < 18 || dados.idade > 65) {
      return 'Desculpe, você não pode receber o benefício porque sua idade não está entre 18 e 65 anos.';
    }

    const planoValido =
      dados.plano === 'Premium' || (dados.plano === 'Essencial' && dados.mesesAtivo >= 12);

    if (!planoValido) {
      return 'Desculpe, você não pode receber o benefício porque seu tipo de plano ou tempo de uso não atende aos requisitos.';
    }

    if (dados.carencia !== 'sim') {
      return 'Desculpe, você não pode receber o benefício porque ainda não concluiu o período de carência.';
    }

    if (dados.doencasCronicas === 'sim') {
      return 'Desculpe, você não pode receber o benefício porque possui doenças crônicas cadastradas.';
    }

    if (dados.dependentes > 3) {
      return 'Desculpe, você não pode receber o benefício porque possui mais de 3 dependentes.';
    }

    if (dados.consultasRecentes !== 'sim') {
      return 'Desculpe, você não pode receber o benefício porque não teve consultas liberadas nos últimos 6 meses.';
    }

    if (dados.faturasAtraso === 'sim') {
      return 'Desculpe, você não pode receber o benefício porque há faturas em atraso.';
    }

    const estadoNormalizado = dados.estado.trim().toLowerCase();
    const estadosValidos = ['são paulo', 'minas gerais', 'paraná'];
    if (!estadosValidos.includes(estadoNormalizado)) {
      return 'Desculpe, você não pode receber o benefício porque seu estado não está na lista dos atendidos.';
    }

    return null; // Nenhuma regra falhou
  };

  const mensagemErro = verificarRegras();

  return (
    <View style={styles.container}>
      <Text style={styles.resultado}>
        {mensagemErro
          ? mensagemErro
          : 'Parabéns, você está qualificado para o benefício extra do seu Plano de Saúde!'}
      </Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    justifyContent: 'center',
  },
  resultado: {
    fontSize: 18,
    marginBottom: 20,
  },
});