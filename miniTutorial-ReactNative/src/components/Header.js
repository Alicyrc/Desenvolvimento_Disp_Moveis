import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useRoute } from '@react-navigation/native';

const Header = ({ navigation, title }) => {
  const { colors, isDarkMode, toggleTheme } = useTheme();

  const route = useRoute();

  const showBackButton = route.name !== 'Welcome';

  return (
    <View style={[styles.header, { backgroundColor: colors.primary }]}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
      
      <Text style={[styles.title, { color: 'white' }]}>{title}</Text>
      
      <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
        <Ionicons 
          name={isDarkMode ? 'sunny' : 'moon'} 
          size={24} 
          color="white" 
        />
        <Text style={[styles.themeText, { color: 'white' }]}>
          {isDarkMode ? 'Claro' : 'Escuro'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 15,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    themeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    themeText: {
      marginLeft: 5,
      fontSize: 14,
    },
  });

export default Header;