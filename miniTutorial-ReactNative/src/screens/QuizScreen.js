import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const quizData = [
  {
    question: "O que é React Native?",
    options: [
      "Uma biblioteca para criar sites responsivos",
      "Um framework para construir apps móveis nativos usando JavaScript e React",
      "Uma linguagem de programação para Android",
      "Um compilador de código JavaScript"
    ],
    correctAnswer: "Um framework para construir apps móveis nativos usando JavaScript e React"
  },
  {
    question: "Qual componente é usado como contêiner de layout em React Native?",
    options: [
      "<Text>",
      "<Button>",
      "<Div>",
      "<View>"
    ],
    correctAnswer: "<View>"
  },
  {
    question: "Como o valor digitado em um TextInput é geralmente armazenado?",
    options: [
      "Em uma variável global",
      "Através do contexto de navegação",
      "Usando o hook useState",
      "Diretamente no componente <Text>"
    ],
    correctAnswer: "Usando o hook useState"
  },
  {
    question: "O que o componente Switch faz em React Native?",
    options: [
      "Cria abas de navegação",
      "Alterna entre dois estados booleanos",
      "Aplica bordas aos botões",
      "Mostra uma lista suspensa"
    ],
    correctAnswer: "Alterna entre dois estados booleanos"
  } 
];

const QuizScreen = () => {
  const { colors } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.container, { backgroundColor: colors.background }]}>
      {showScore ? (
        <View style={styles.scoreContainer}>
          <Text style={[styles.scoreText, { color: colors.text }]}>
            Você acertou {score} de {quizData.length} perguntas!
          </Text>
          <TouchableOpacity 
            onPress={restartQuiz}
            style={[styles.restartButton, { backgroundColor: colors.primary }]}
          >
            <Text style={[styles.restartButtonText, { color: 'white' }]}>Refazer Quiz</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.questionContainer}>
          <View style={styles.questionCount}>
            <Text style={[styles.countText, { color: colors.text }]}>
              Pergunta {currentQuestion + 1}/{quizData.length}
            </Text>
          </View>
          
          <Text style={[styles.questionText, { color: colors.text }]}>
            {quizData[currentQuestion].question}
          </Text>
          
          {quizData[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleAnswer(option)}
              style={[styles.optionButton, { backgroundColor: colors.primary }]}
            >
              <Text style={[styles.optionText, { color: 'white' }]}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  questionContainer: {
    width: '100%',
  },
  questionCount: {
    marginBottom: 20,
  },
  countText: {
    fontSize: 16,
    opacity: 0.6,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  optionButton: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  optionText: {
    fontSize: 16,
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  restartButton: {
    padding: 15,
    borderRadius: 8,
    width: '50%',
  },
  restartButtonText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default QuizScreen;