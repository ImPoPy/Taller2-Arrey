import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { router } from 'expo-router';

export default function AutorScreen() {
  const theme = useTheme();

  return (
    <>
      <Appbar.Header style={[styles.appbar, { backgroundColor: theme.colors.primary }]}>
        <Appbar.BackAction onPress={() => router.back()} color="#FFFFFF" />
        <Appbar.Content title="Autor" color="#FFFFFF" />
      </Appbar.Header>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Image
          source={require('../assets/img/icon-autor.jpeg')}
          style={styles.avatar}
        />
        <Text style={[styles.nombre, { color: theme.colors.onBackground }]}>Juan Carlos Mosquera Marín </Text>
        <Text style={[styles.info, { color: theme.colors.onBackground }]}>Correo personal: juan31354@gmail.com</Text>
        <Text style={[styles.info, { color: theme.colors.onBackground }]}>Correo institucional: juan.mosquera286@utch.edu.co</Text>
        <Text style={[styles.info, { color: theme.colors.onBackground }]}>Ingeniería de Telecomunicaciones e Informatica - 7° semestre</Text>
        <Text style={[styles.descripcion, { color: theme.colors.onBackground }]}>
          Estudiante apasionado por la programacion, la ingenieria, el dibujo, diseño entre otras muchas cosas
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appbar: { elevation: 0 },
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20, borderWidth: 2, borderColor: '#2c7da0' },
  nombre: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  info: { fontSize: 16, marginBottom: 5, textAlign: 'center' },
  descripcion: { fontSize: 14, textAlign: 'center', marginTop: 20, marginHorizontal: 20, lineHeight: 20 },
});