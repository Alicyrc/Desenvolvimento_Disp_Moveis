import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const DemoScreen = ({ route }) => {
  const { lessonId } = route.params;
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const [text, setText] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const renderDemo = () => {
    switch (lessonId) {
      case '1':
        return (
            <View>
            <Text style={[styles.demoText, { color: colors.text }]}>
              📱 <Text style={{ fontWeight: 'bold' }}>React Native</Text> é um framework criado pelo Facebook que permite criar aplicativos móveis nativos para Android e iOS usando <Text style={{ fontWeight: 'bold' }}>JavaScript</Text> e <Text style={{ fontWeight: 'bold' }}>React</Text>.
              {"\n\n"}Ele permite reutilizar código e lógica de interface com uma experiência próxima de apps nativos.
            </Text>
          </View>
        );
      case '2':
        return (
            <View>
            <Text style={[styles.demoText, { color: colors.text }]}>
              ⚙️ <Text style={{ fontWeight: 'bold' }}>Componentes básicos:</Text>
            </Text>
            <Text style={{ color: colors.text }}>
              • <Text style={{ fontWeight: 'bold' }}>View</Text>: contêiner de layout, como uma div no HTML.{"\n"}
              • <Text style={{ fontWeight: 'bold' }}>Text</Text>: exibe textos.{"\n"}
              • <Text style={{ fontWeight: 'bold' }}>TextInput</Text>: campo para entrada de texto.{"\n"}
              • <Text style={{ fontWeight: 'bold' }}>Button</Text>: botão básico para ações.
            </Text>
          </View>
        );
      case '3':
        return (
          <View>
            <Text style={[styles.demoText, { color: colors.text }]}>
              ✍️ <Text style={{ fontWeight: 'bold' }}>TextInput</Text> permite que o usuário digite dados. O conteúdo é armazenado em um estado com <Text style={{ fontWeight: 'bold' }}>useState</Text> e pode ser exibido dinamicamente.
            </Text>
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.text }]}
              onChangeText={setText}
              value={text}
              placeholder="Digite algo"
              placeholderTextColor={colors.text}
            />
            <Text style={{ color: colors.text }}>Você digitou: {text}</Text>
          </View>
        );
      case '4':
        return (
          <View>
            <Text style={[styles.demoText, { color: colors.text }]}>
              🎛️ Com o componente <Text style={{ fontWeight: 'bold' }}>Switch</Text>, você pode alternar entre dois estados e aplicar estilos dinamicamente com base em condições.
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: colors.primary }}
              thumbColor={isEnabled ? colors.secondary : '#f4f3f4'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={[styles.demoText, { 
              fontWeight: isEnabled ? 'bold' : 'normal',
              fontSize: isEnabled ? 20 : 16,
              color: isEnabled ? colors.primary : colors.text
            }]}>
              Texto estilizado dinamicamente
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {renderDemo()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  demoText: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
});

export default DemoScreen;