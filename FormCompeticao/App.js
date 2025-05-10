import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  const [form, setForm] = useState({
    nome: '',
    cep: '',
    cpf: '',
    telefone: '',
    email: '',
    senha: ''
  });

  const [errors, setErrors] = useState({});

  const regex = {
    cep: /^\d{5}-?\d{3}$/,
    cpf: /^\d{11}$/,
    telefone: /^\d{10,11}$/,
    email: /^\S+@\S+\.\S+$/,
    senha: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/
  };

  const acentoRegex = /[çÇáàâãéèêíïóôõöúüñÁÀÂÃÉÈÍÏÓÔÕÖÚÜÑ]/;

  const validateField = (name, value) => {
    let message = '';

    switch (name) {
      case 'nome':
        if (!value.trim()) message = 'Nome é obrigatório';
        break;
      case 'cep':
        if (!regex.cep.test(value)) message = 'CEP inválido (ex: 12345-678)';
        break;
      case 'cpf':
        if (!regex.cpf.test(value)) message = 'CPF deve conter 11 números';
        break;
      case 'telefone':
        if (!regex.telefone.test(value)) message = 'Telefone inválido com DDD';
        break;
      case 'email':
        if (!regex.email.test(value)) message = 'E-mail inválido';
        break;
      case 'senha':
        if (!regex.senha.test(value) || acentoRegex.test(value)) {
          message = 'Senha: min 8, letra maiúscula, minúscula, número, símbolo, sem acento/ç';
        }
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: message }));
    return !message;
  };

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateAll = () => {
    const results = Object.entries(form).map(([key, value]) => {
      const result = validateField(key, value);
      console.log(`${key} is valid:`, result);
      return result;
    });
    return results.every((result) => result); 
  };
  

  const handleSubmit = () => {
    const isValid = validateAll();
    console.log('Is Valid:', isValid);
    if (isValid) {
      alert('Dados salvos!');
      setForm({
        nome: '',
        cep: '',
        cpf: '',
        telefone: '',
        email: '',
        senha: ''
      });
    setErrors({});
  } else {
    alert('Erro', 'Corrija os campos destacados.');
  }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {[
        { name: 'nome', label: 'Nome completo', keyboardType: 'default' },
        { name: 'cep', label: 'CEP', keyboardType: 'numeric' },
        { name: 'cpf', label: 'CPF', keyboardType: 'numeric' },
        { name: 'telefone', label: 'Telefone com DDD', keyboardType: 'numeric' },
        { name: 'email', label: 'E-mail', keyboardType: 'email-address' },
        { name: 'senha', label: 'Senha', secureTextEntry: true },
      ].map(({ name, label, ...props }) => (
        <View key={name} style={styles.inputGroup}>
          <Text>{label}</Text>
          <TextInput
            style={styles.input}
            value={form[name]}
            onChangeText={(text) => handleChange(name, text)}
            {...props}
          />
          {errors[name] ? <Text style={styles.error}>{errors[name]}</Text> : null}
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2E6D8',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderColor: '#8C6B42',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginTop: 5,
  },
  error: {
    color: '#e74c3c',
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#BFA07A',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#F2F2F0',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});