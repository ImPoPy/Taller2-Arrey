import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import {
  Appbar,
  Searchbar,
  Text,
  Card,
  Avatar,
  useTheme,
  ActivityIndicator,
} from "react-native-paper";
import { router } from "expo-router";

const usuariosData = require("../assets/usuario.json");

export default function PerfilUsuario() {
  const theme = useTheme();
  const [usuarios, setUsuarios] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setUsuarios(usuariosData.usuarios);
    setFiltrados(usuariosData.usuarios);
    setCargando(false);
  }, []);

  useEffect(() => {
    if (busqueda.trim() === "") {
      setFiltrados(usuarios);
    } else {
      const filtro = usuarios.filter(
        (user) =>
          user.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          user.email.toLowerCase().includes(busqueda.toLowerCase())
      );
      setFiltrados(filtro);
    }
  }, [busqueda, usuarios]);

  const handleSelectUser = (usuario) => {
    router.push({
      pathname: "/detalleperfil",
      params: {
        nombre: usuario.nombre,
        email: usuario.email,
      },
    });
  };

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <>
      <Appbar.Header style={[styles.appbar, { backgroundColor: theme.colors.primary }]}>
        <Appbar.BackAction iconColor="#FFFFFF" onPress={() => router.back()} />
        <Appbar.Content title="Seleccionar usuario" color="#FFFFFF" />
      </Appbar.Header>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Searchbar
          placeholder="Buscar por nombre o email"
          onChangeText={setBusqueda}
          value={busqueda}
          style={styles.searchbar}
        />
        <FlatList
          data={filtrados}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectUser(item)}>
              <Card style={styles.card}>
                <Card.Title
                  title={item.nombre}
                  subtitle={item.email}
                  left={(props) => <Avatar.Icon {...props} icon="account" />}
                />
              </Card>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appbar: { elevation: 0 },
  container: { flex: 1, padding: 16 },
  searchbar: { marginBottom: 16, borderRadius: 30 },
  listContainer: { paddingBottom: 20 },
  card: { marginBottom: 12, borderRadius: 12 },
  centrado: { flex: 1, justifyContent: "center", alignItems: "center" },
});