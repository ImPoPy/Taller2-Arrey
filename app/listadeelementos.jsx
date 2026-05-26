import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Appbar, Card, Text, Button, Searchbar, useTheme } from "react-native-paper";
import { router } from "expo-router";

const datos = require("../assets/conocimientos_previos.json");

export default function ListaElementos() {
  const theme = useTheme();
  const [textoBuscar, setTextoBuscar] = useState("");
  const [elementos, setElementos] = useState([]);
  const [elementosFiltrados, setElementosFiltrados] = useState([]);
  const [expandedIds, setExpandedIds] = useState({});

  useEffect(() => {
    setElementos(datos.elementos);
    setElementosFiltrados(datos.elementos);
    const initialExpanded = {};
    datos.elementos.forEach((item) => {
      initialExpanded[item.id] = item.mostrarTodo || false;
    });
    setExpandedIds(initialExpanded);
  }, []);

  // Filtrar cuando cambia textoBuscar
  useEffect(() => {
    if (textoBuscar.trim() === "") {
      setElementosFiltrados(elementos);
    } else {
      const filtrados = elementos.filter((item) =>
        item.titulo.toLowerCase().includes(textoBuscar.toLowerCase())
      );
      setElementosFiltrados(filtrados);
    }
  }, [textoBuscar, elementos]);

  const toggleExpand = (id) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getDescripcionMostrada = (item) => {
    const expanded = expandedIds[item.id];
    if (expanded) {
      return item.descripcion;
    } else {
      return item.descripcion.length > 30
        ? item.descripcion.substring(0, 30) + "..."
        : item.descripcion;
    }
  };

  const handlePressItem = (id) => {
    router.push({ pathname: "/detalleelemento", params: { id: id.toString() } });
  };

  return (
    <>
      <Appbar.Header style={[styles.appbar, { backgroundColor: theme.colors.primary }]}>
        <Appbar.BackAction iconColor="#FFFFFF" onPress={() => router.back()} />
        <Appbar.Content title="Lista de elementos" color="#FFFFFF" />
      </Appbar.Header>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Searchbar
          placeholder="Buscar"
          onChangeText={setTextoBuscar}
          value={textoBuscar}
          style={styles.searchbar}
        />
        <ScrollView>
          {elementosFiltrados.map((item) => (
            <Card key={item.id} style={styles.card}>
              <Card.Cover source={{ uri: item.urlImagen }} style={styles.cardImage} />
              <Card.Content>
                <Text variant="titleLarge" style={{ color: theme.colors.onBackground }}>
                  {item.titulo}
                </Text>
                <Text variant="bodyMedium" style={{ marginVertical: 8, color: theme.colors.onSurfaceVariant }}>
                  {getDescripcionMostrada(item)}
                </Text>
                <View style={styles.buttonRow}>
                  <Button
                    mode="text"
                    onPress={() => toggleExpand(item.id)}
                    textColor={theme.colors.primary}
                  >
                    {expandedIds[item.id] ? "Ver menos" : "Ver más"}
                  </Button>
                  <Button
                    mode="contained"
                    onPress={() => handlePressItem(item.id)}
                    style={styles.actionButton}
                  >
                    Acción
                  </Button>
                </View>
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appbar: { elevation: 0 },
  container: { flex: 1, padding: 16 },
  searchbar: { marginBottom: 16, borderRadius: 30 },
  card: { marginBottom: 16, borderRadius: 16, overflow: "hidden" },
  cardImage: { height: 150 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  actionButton: { borderRadius: 30 },
});