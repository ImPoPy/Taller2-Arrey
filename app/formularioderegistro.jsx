import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Appbar, TextInput, Button, Text, useTheme } from "react-native-paper";
import { router } from "expo-router";

const usuariosData = require("../assets/usuario.json");

export default function FormularioRegistro() {
  const theme = useTheme();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleRegistro = () => {
    if (!nombre.trim()) {
      Alert.alert("Error", "Por favor ingresa tu nombre");
      return;
    }
    if (!email.trim()) {
      Alert.alert("Error", "Por favor ingresa tu correo electrónico");
      return;
    }
    if (!password.trim()) {
      Alert.alert("Error", "Por favor ingresa una contraseña");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    setCargando(true);

    setTimeout(() => {
      const existe = usuariosData.usuarios.some(
        (user) => user.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (existe) {
        Alert.alert("Advertencia", "El usuario ya existe. Por favor, inicia sesión.");
        setCargando(false);
      } else {
        Alert.alert("Éxito", `Usuario creado correctamente.\n¡Bienvenido ${nombre}!`);
        setNombre("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setCargando(false);
      }
    }, 800);
  };

  return (
    <>
      <Appbar.Header style={[styles.appbar, { backgroundColor: theme.colors.primary }]}>
        <Appbar.BackAction iconColor="#FFFFFF" onPress={() => router.back()} />
        <Appbar.Content title="Registro de usuario" color="#FFFFFF" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text variant="headlineSmall" style={[styles.title, { color: theme.colors.onBackground }]}>
          Crear cuenta
        </Text>

        <TextInput
          label="Nombre completo"
          mode="outlined"
          value={nombre}
          onChangeText={setNombre}
          left={<TextInput.Icon icon="account" />}
          style={styles.input}
          outlineColor={theme.colors.outline}
          activeOutlineColor={theme.colors.primary}
          textColor={theme.colors.onBackground}
        />

        <TextInput
          label="Correo electrónico"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          left={<TextInput.Icon icon="email" />}
          style={styles.input}
          outlineColor={theme.colors.outline}
          activeOutlineColor={theme.colors.primary}
          textColor={theme.colors.onBackground}
        />

        <TextInput
          label="Contraseña"
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          left={<TextInput.Icon icon="lock" />}
          style={styles.input}
          outlineColor={theme.colors.outline}
          activeOutlineColor={theme.colors.primary}
          textColor={theme.colors.onBackground}
        />

        <TextInput
          label="Confirmar contraseña"
          mode="outlined"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          left={<TextInput.Icon icon="lock-check" />}
          style={styles.input}
          outlineColor={theme.colors.outline}
          activeOutlineColor={theme.colors.primary}
          textColor={theme.colors.onBackground}
        />

        <Button
          mode="contained"
          onPress={handleRegistro}
          loading={cargando}
          disabled={cargando}
          style={[styles.button, { backgroundColor: theme.colors.secondary }]}
          labelStyle={styles.buttonLabel}
        >
          Registrarse
        </Button>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  appbar: { elevation: 0 },
  container: { flexGrow: 1, padding: 24, justifyContent: "center" },
  title: { textAlign: "center", marginBottom: 24, fontWeight: "bold" },
  input: { marginBottom: 16 },
  button: { marginTop: 16, borderRadius: 30, paddingVertical: 6 },
  buttonLabel: { fontSize: 16, fontWeight: "bold", color: "#FFFFFF" },
});