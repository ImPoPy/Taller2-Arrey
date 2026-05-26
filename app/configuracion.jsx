import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import {
  Appbar,
  List,
  Switch,
  Text,
  Button,
  useTheme,
  Divider,
  TouchableRipple,
} from "react-native-paper";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Configuracion() {
  const theme = useTheme();

  const [notificaciones, setNotificaciones] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [idioma, setIdioma] = useState("es");

  useEffect(() => {
    cargarPreferencias();
  }, []);

  const cargarPreferencias = async () => {
    try {
      const notif = await AsyncStorage.getItem("notificaciones");
      const dark = await AsyncStorage.getItem("modoOscuro");
      const lang = await AsyncStorage.getItem("idioma");
      if (notif !== null) setNotificaciones(notif === "true");
      if (dark !== null) setModoOscuro(dark === "true");
      if (lang !== null) setIdioma(lang);
    } catch (error) {
      console.log("Error al cargar preferencias", error);
    }
  };

  const guardarPreferencias = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value.toString());
    } catch (error) {
      console.log("Error al guardar", error);
    }
  };

  const toggleNotificaciones = () => {
    const nuevoValor = !notificaciones;
    setNotificaciones(nuevoValor);
    guardarPreferencias("notificaciones", nuevoValor);
  };

  const toggleModoOscuro = () => {
    const nuevoValor = !modoOscuro;
    setModoOscuro(nuevoValor);
    guardarPreferencias("modoOscuro", nuevoValor);
    Alert.alert("Tema", `Modo ${nuevoValor ? "oscuro" : "claro"} seleccionado. Reinicia la app para aplicar cambios.`);
  };

  const cambiarIdioma = (lang) => {
    setIdioma(lang);
    guardarPreferencias("idioma", lang);
    Alert.alert("Idioma", `Idioma cambiado a ${lang === "es" ? "español" : "inglés"}. Reinicia para aplicar.`);
  };

  const handleCerrarSesion = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que deseas cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Aceptar", onPress: () => router.replace("/") },
      ]
    );
  };

  return (
    <>
      <Appbar.Header style={[styles.appbar, { backgroundColor: theme.colors.primary }]}>
        <Appbar.BackAction iconColor="#FFFFFF" onPress={() => router.back()} />
        <Appbar.Content title="Configuración" color="#FFFFFF" />
      </Appbar.Header>

      <ScrollView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        contentContainerStyle={styles.scrollContent}
      >
        <List.Section>
          <List.Subheader>Preferencias generales</List.Subheader>

          <TouchableRipple onPress={toggleNotificaciones}>
            <List.Item
              title="Notificaciones"
              description="Recibir alertas y recordatorios"
              left={props => <List.Icon {...props} icon="bell" />}
              right={() => <Switch value={notificaciones} onPress={toggleNotificaciones} />}
            />
          </TouchableRipple>

          <TouchableRipple onPress={toggleModoOscuro}>
            <List.Item
              title="Modo oscuro"
              description="Cambiar el tema de la aplicación"
              left={props => <List.Icon {...props} icon="theme-light-dark" />}
              right={() => <Switch value={modoOscuro} onPress={toggleModoOscuro} />}
            />
          </TouchableRipple>

          <List.Item
            title="Idioma"
            description={idioma === "es" ? "Español" : "Inglés"}
            left={props => <List.Icon {...props} icon="translate" />}
            onPress={() => {
              Alert.alert(
                "Seleccionar idioma",
                "",
                [
                  { text: "Español", onPress: () => cambiarIdioma("es") },
                  { text: "Inglés", onPress: () => cambiarIdioma("en") },
                  { text: "Cancelar", style: "cancel" },
                ]
              );
            }}
          />

          <Divider style={styles.divider} />

          <List.Subheader>Cuenta</List.Subheader>

          <List.Item
            title="Cerrar sesión"
            description="Salir de tu cuenta"
            left={props => <List.Icon {...props} icon="logout" color={theme.colors.secondary} />}
            onPress={handleCerrarSesion}
            titleStyle={{ color: theme.colors.secondary }}
          />

          <Divider style={styles.divider} />

          <List.Subheader>Acerca de</List.Subheader>

          <List.Item
            title="Versión de la app"
            description="1.0.0"
            left={props => <List.Icon {...props} icon="information" />}
          />
        </List.Section>

        <View style={styles.footer}>
          <Divider style={styles.footerDivider} />
          <Button
            mode="text"
            onPress={() => Alert.alert("Términos y condiciones", "Próximamente")}
            labelStyle={[styles.footerButtonText, { color: theme.colors.primary }]}
            style={styles.footerButton}
          >
            Términos y condiciones
          </Button>
          <Text style={[styles.copyright, { color: theme.colors.onSurfaceVariant }]}>
            © 2025 OhMyDOG - Todos los derechos reservados
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  appbar: { elevation: 0 },
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 20 },
  divider: { marginVertical: 8 },
  footer: {
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
  },
  footerDivider: {
    width: "80%",
    marginBottom: 20,
  },
  footerButton: {
    marginBottom: 8,
  },
  footerButtonText: {
    fontSize: 14,
    textDecorationLine: "underline",
  },
  copyright: {
    fontSize: 12,
    textAlign: "center",
  },
});