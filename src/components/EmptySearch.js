import React from 'react';
import {StyleSheet} from 'react-native';
import {Title, Surface} from 'react-native-paper';

export default function EmptySearch() {
  return (
    <Surface style={styles.container}>
      <Title>Desculpe, sua pesquisa não retornou nenhum vídeo... 😕</Title>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {margin: 8, padding: 8, elevation: 1},
});
