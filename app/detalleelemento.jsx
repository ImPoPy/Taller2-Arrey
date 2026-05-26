import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image, Alert } from "react-native";
import { Appbar, Text, Button, useTheme, ActivityIndicator } from "react-native-paper";
import { useLocalSearchParams, router } from "expo-router";

const datos = require("../assets/conocimientos_previos.json");

export default function DetalleElemento() {
  const theme = useTheme();
  const { id } = useLocalSearchParams();
  const [elemento, setElemento] = useState(null);

  useEffect(() => {
    if (id) setElemento(datos.elementos.find(item => item.id === parseInt(id)));
  }, [id]);

  const handleAccion = () => Alert.alert("Acción", `Has seleccionado: ${elemento.titulo} - ${elemento.precio}`);

  if (!elemento) return (<View style={styles.centrado}><ActivityIndicator animating size="large" color={theme.colors.primary} /><Text>Cargando...</Text></View>);

  return (
    <>
      <Appbar.Header style={[styles.appbar, { backgroundColor: theme.colors.primary }]}>
        <Appbar.BackAction iconColor="#FFFFFF" onPress={() => router.back()} />
        <Appbar.Content title="Detalle de elemento" color="#FFFFFF" />
      </Appbar.Header>
      <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Image source={{ uri: elemento.urlImagen }} style={styles.imagen} resizeMode="cover" />
        <View style={styles.content}>
          <Text variant="headlineMedium" style={{ color: theme.colors.onBackground, fontWeight: 'bold' }}>{elemento.titulo}</Text>
          <Text variant="titleLarge" style={{ color: theme.colors.secondary, marginTop: 8, marginBottom: 16 }}>{elemento.precio}</Text>
          <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant, lineHeight: 24 }}>{elemento.descripcion}</Text>
          <Button mode="contained" onPress={handleAccion} style={[styles.button, { backgroundColor: theme.colors.secondary }]} labelStyle={{ fontSize: 16, fontWeight: "bold", color: "#FFFFFF" }}>Acción</Button>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  appbar: { elevation: 0 },
  container: { flex: 1 },
  centrado: { flex: 1, justifyContent: "center", alignItems: "center" },
  imagen: { width: "100%", height: 250 },
  content: { padding: 20 },
  button: { marginTop: 32, borderRadius: 30, paddingVertical: 6 },
});