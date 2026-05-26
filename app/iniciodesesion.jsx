import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity } from "react-native";
import { Appbar, TextInput, Button, Text, useTheme, Divider } from "react-native-paper";
import { router } from "expo-router";

const usuariosData = require("../assets/usuario.json");

export default function InicioSesion() {
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleLogin = () => {
    if (!email.trim()) return Alert.alert("Error", "Ingresa tu correo");
    if (!password.trim()) return Alert.alert("Error", "Ingresa tu contraseña");
    setCargando(true);
    setTimeout(() => {
      const usuario = usuariosData.usuarios?.find(u => u.email === email);
      if (!usuario) Alert.alert("Error", "El usuario no existe.");
      else if (usuario.password !== password) Alert.alert("Error", "Datos de acceso incorrecto.");
      else Alert.alert("Bienvenido", `Acceso correcto.\n¡Hola ${usuario.nombre}!`);
      setCargando(false);
    }, 800);
  };

  return (
    <>
      <Appbar.Header style={[styles.appbar, { backgroundColor: theme.colors.primary }]}>
        <Appbar.BackAction iconColor="#FFFFFF" onPress={() => router.back()} />
        <Appbar.Content title="Iniciar sesión" color="#FFFFFF" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
        <TextInput label="Correo electrónico" mode="outlined" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" left={<TextInput.Icon icon="email" />} style={styles.input} outlineColor={theme.colors.outline} activeOutlineColor={theme.colors.primary} />
        <TextInput label="Contraseña" mode="outlined" value={password} onChangeText={setPassword} secureTextEntry left={<TextInput.Icon icon="lock" />} style={styles.input} outlineColor={theme.colors.outline} activeOutlineColor={theme.colors.primary} />
        <TouchableOpacity onPress={() => Alert.alert("Recuperar", "Próximamente")}><Text style={{ color: theme.colors.primary, textAlign: 'right', marginBottom: 24 }}>¿Olvidaste tu contraseña?</Text></TouchableOpacity>
        <Button mode="contained" onPress={handleLogin} loading={cargando} disabled={cargando} style={[styles.button, { backgroundColor: theme.colors.secondary }]}>INICIAR SESIÓN</Button>
        <Divider style={styles.divider} />
        <Text variant="bodyMedium" style={{ textAlign: "center", marginBottom: 16 }}>O continúa con</Text>
        <View style={styles.socialButtons}>
          <Button mode="outlined" icon="google" style={styles.socialButton} onPress={() => Alert.alert("Google", "Próximamente")}>Google</Button>
          <Button mode="outlined" icon="apple" style={styles.socialButton} onPress={() => Alert.alert("Apple", "Próximamente")}>Apple</Button>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  appbar: { elevation: 0 },
  container: { flexGrow: 1, padding: 24, justifyContent: "center" },
  input: { marginBottom: 16 },
  button: { borderRadius: 30, marginBottom: 24 },
  divider: { marginVertical: 24 },
  socialButtons: { flexDirection: "row", justifyContent: "space-between", gap: 16 },
  socialButton: { flex: 1, borderRadius: 30 },
});