import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  Appbar,
  Text,
  Avatar,
  List,
  Divider,
  Button,
  useTheme,
} from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";

export default function DetallePerfil() {
  const theme = useTheme();
  const { nombre, email } = useLocalSearchParams();

  const handleOption = (opcion) => {
    Alert.alert("Información", `Próximamente: ${opcion}`);
  };

  const handleCerrarSesion = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sí", onPress: () => router.replace("/") }
      ]
    );
  };

  return (
    <>
      <Appbar.Header style={[styles.appbar, { backgroundColor: theme.colors.primary }]}>
        <Appbar.BackAction iconColor="#FFFFFF" onPress={() => router.back()} />
        <Appbar.Content title="Perfil" color="#FFFFFF" />
      </Appbar.Header>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.avatarContainer}>
          <Avatar.Icon size={100} icon="account" style={{ backgroundColor: theme.colors.secondary }} />
          <Text variant="headlineMedium" style={{ marginTop: 16, color: theme.colors.onBackground }}>
            {nombre}
          </Text>
          <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant }}>
            {email}
          </Text>
        </View>

        <List.Section style={styles.section}>
          <List.Item
            title="Editar perfil"
            left={props => <List.Icon {...props} icon="account-edit" />}
            onPress={() => handleOption("Editar perfil")}
          />
          <Divider />
          <List.Item
            title="Notificaciones"
            left={props => <List.Icon {...props} icon="bell" />}
            onPress={() => handleOption("Notificaciones")}
          />
          <Divider />
          <List.Item
            title="Configuración"
            left={props => <List.Icon {...props} icon="cog" />}
            onPress={() => handleOption("Configuración")}
          />
          <Divider />
          <List.Item
            title="Ayuda"
            left={props => <List.Icon {...props} icon="help-circle" />}
            onPress={() => handleOption("Ayuda")}
          />
        </List.Section>

        <Button
          mode="contained"
          onPress={handleCerrarSesion}
          style={[styles.logoutButton, { backgroundColor: theme.colors.secondary }]}
          labelStyle={styles.logoutLabel}
        >
          Cerrar sesión
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appbar: { elevation: 0 },
  container: { flex: 1, padding: 20 },
  avatarContainer: { alignItems: "center", marginVertical: 32 },
  section: { marginTop: 20 },
  logoutButton: { marginTop: 40, borderRadius: 30, marginHorizontal: 20 },
  logoutLabel: { fontSize: 16, fontWeight: "bold", color: "#FFFFFF" },
});