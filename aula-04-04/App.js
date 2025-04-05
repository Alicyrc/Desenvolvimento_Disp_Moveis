// App.js
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal,
  Button,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';

// Lista mockada de músicas do Spotify
const MOCK_MUSICAS = [
  {
    id: '1',
    nome: 'Blinding Lights',
    artista: 'The Weeknd',
    imagem: 'https://images.genius.com/34c1c35ca27a735e6e5f18611acb1c16.1000x1000x1.png',
  },
  {
    id: '2',
    nome: 'Levitating',
    artista: 'Dua Lipa',
    imagem: 'https://i.scdn.co/image/ab67616d0000b2734bc66095f8a70bc4e6593f4f',
  },
  {
    id: '3',
    nome: 'Peaches',
    artista: 'Justin Bieber',
    imagem: 'https://images.genius.com/7fe95e1b68bd9fe6b8c3f44f68d4e55b.1000x1000x1.png',
  },
  {
    id: '4',
    nome: 'Stay',
    artista: 'The Kid LAROI & Justin Bieber',
    imagem: 'https://images.genius.com/cd085ac3e3266b1d7af750c367855fda.1000x1000x1.png',
  },
  {
    id: '5',
    nome: 'Watermelon Sugar',
    artista: 'Harry Styles',
    imagem: 'https://images.genius.com/f9cde4e84e270b73ad462a8585aba5b3.1000x1000x1.png',
  },
  {
    id: '6',
    nome: 'As It Was',
    artista: 'Harry Styles',
    imagem: 'https://i.scdn.co/image/ab67616d0000b273b46f74097655d7f353caab14',
  },
  {
    id: '7',
    nome: 'bad guy',
    artista: 'Billie Eilish',
    imagem: 'https://i.scdn.co/image/ab67616d0000b27350a3147b4edd7701a876c6ce',
  },
  {
    id: '8',
    nome: 'MONTERO (Call Me By Your Name)',
    artista: 'Lil Nas X',
    imagem: 'https://upload.wikimedia.org/wikipedia/pt/e/e6/Montero_%28Call_Me_by_Your_Name%29.png',
  },
  {
    id: '9',
    nome: 'good 4 u',
    artista: 'Olivia Rodrigo',
    imagem: 'https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e5a',
  },
  {
    id: '10',
    nome: 'drivers license',
    artista: 'Olivia Rodrigo',
    imagem: 'https://upload.wikimedia.org/wikipedia/pt/0/0b/Drivers_License_-_Olivia_Rodrigo.png',
  },
];


export default function App() {
  const [musicas, setMusicas] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [musicaSelecionada, setMusicaSelecionada] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Simulando carregamento
    setTimeout(() => {
      setMusicas(MOCK_MUSICAS);
      setCarregando(false);
    }, 2000);
  }, []);

  const filtrarMusicas = () => {
    const resultado = MOCK_MUSICAS.filter(m =>
      m.nome.toLowerCase().includes(filtro.toLowerCase())
    );
    setMusicas(resultado);
  };

  const abrirDetalhes = (musica) => {
    setMusicaSelecionada(musica);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    setMusicaSelecionada(null);
  };

const mostrarAlerta = () => {
  if (Platform.OS === 'web') {
    window.alert('Spotify Clone: Você clicou em um botão!');
  } else {
    Alert.alert('Spotify Clone', 'Você clicou em um botão!');
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>🎵 Lista de Músicas - Spotify</Text>

      <TextInput
        style={styles.input}
        placeholder="Filtrar por nome..."
        value={filtro}
        onChangeText={setFiltro}
      />

      <Button title="Filtrar" onPress={filtrarMusicas} />

      {carregando ? (
        <ActivityIndicator size="large" color="#1DB954" style={styles.loader} />
      ) : (
        <FlatList
          data={musicas}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => abrirDetalhes(item)}
            >
              <Image source={{ uri: item.imagem }} style={styles.imagem} />
              <View>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.artista}>{item.artista}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={fecharModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {musicaSelecionada && (
              <>
                <Image
                  source={{ uri: musicaSelecionada.imagem }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalTitle}>{musicaSelecionada.nome}</Text>
                <Text style={styles.modalArtist}>{musicaSelecionada.artista}</Text>
                <Button title="Fechar" onPress={fecharModal} />
              </>
            )}
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.botaoAlerta} onPress={mostrarAlerta}>
        <Text style={styles.botaoTexto}>Alerta</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8E6C9',
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1DB954',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  loader: {
    marginTop: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  imagem: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 10,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  artista: {
    color: '#555',
  },
  botaoAlerta: {
    backgroundColor: '#1DB954',
    padding: 12,
    borderRadius: 6,
    marginTop: 20,
    alignItems: 'center',
  },
  botaoTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalArtist: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
});
