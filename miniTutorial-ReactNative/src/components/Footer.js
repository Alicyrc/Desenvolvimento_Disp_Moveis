import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { colors } = useTheme();

  const handleRepo1Press = () => {
    Linking.openURL('https://github.com/Alicyrc');
  };

  const handleRepo2Press = () => {
    Linking.openURL('https://github.com/LucayanFelipe');
  };

  const handleUniversityPress = () => {
    Linking.openURL('https://www.ifro.edu.br/');
  };

  return (
    <View style={[styles.footer, { backgroundColor: colors.primary }]}>
      <Text style={[styles.text, { color: colors.text }]}>
        Desenvolvido por:
      </Text>
      
      <Text style={[styles.names, { color: colors.text }]}>
        Alicy Rodrigues e Lucayan Felipe
      </Text>
      
      <TouchableOpacity 
        onPress={handleUniversityPress}
        style={styles.universityContainer}
      >
        <Ionicons name="school" size={20} color={colors.text} />
        <Text style={[styles.university, { color: colors.text }]}>
          Instituto Federal de Rondonia (IFRO)
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={handleRepo1Press}>
        <Text style={[styles.contact, { color: colors.text }]}>
          GitHub Alicy
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRepo2Press}>
        <Text style={[styles.contact, { color: colors.text }]}>
          GitHub Lucayan
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
  },
  names: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  universityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  university: {
    fontSize: 14,
    marginLeft: 5,
    fontStyle: 'italic',
  },
  contact: {
    fontSize: 12,
    textDecorationLine: 'underline',
  },
});

export default Footer;