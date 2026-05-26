import React from "react";
import { FlatList, StyleSheet, Image } from "react-native";
import { Appbar, List, Divider, useTheme, TouchableRipple } from "react-native-paper";
import { router } from "expo-router";

const opciones = [
  { id: "0", titulo: "Autor", ruta: "/yo", imagen: require("../assets/img/icons-autor.jpg") },
  { id: "1", titulo: "Inicio de sesión", ruta: "/iniciodesesion", imagen: require("../assets/img/icono-sesion.jpg") },
  { id: "2", titulo: "Pantalla principal", ruta: "/", imagen: require("../assets/img/icono-pantalla.jpg") },
  { id: "3", titulo: "Lista de elementos", ruta: "/listadeelementos", imagen: require("../assets/img/icono-elemento.jpg") },
  { id: "5", titulo: "Formulario de registro", ruta: "/formularioderegistro", imagen: require("../assets/img/icono-registro.jpg") },
  { id: "6", titulo: "Configuración", ruta: "/configuracion", imagen: require("../assets/img/icono-configuracion.jpg") },
  { id: "7", titulo: "Perfil de usuario", ruta: "/perfildeusuario", imagen: require("../assets/img/icono-perfil.jpg") },
  { id: "8", titulo: "Lista de servicios", ruta: "/listadeservicios", imagen: require("../assets/img/icono-servicios.jpg") },
];

const Item = ({ titulo, ruta, imagen }) => {
  const theme = useTheme();
  const handlePress = () => router.push(ruta);

  return (
    <TouchableRipple onPress={handlePress} rippleColor="rgba(0,0,0,0.08)" style={styles.ripple}>
      <>
        <List.Item
          title={titulo}
          titleStyle={[styles.itemTitle, { color: theme.colors.onBackground }]}
          style={[styles.itemContainer, { backgroundColor: theme.colors.surface }]}
          left={() => <Image source={imagen} style={styles.squareImage} resizeMode="cover" />}
          right={(props) => <List.Icon {...props} icon="chevron-right" color="#A5AEBC" />}
        />
        <Divider style={{ backgroundColor: theme.colors.outline }} />
      </>
    </TouchableRipple>
  );
};

export default function MenuScreen() {
  const theme = useTheme();
  return (
    <>
      <Appbar.Header style={[styles.appbar, { backgroundColor: theme.colors.primary }]}>
        <Appbar.Content title="Menú Principal" color="#FFFFFF" />
      </Appbar.Header>
      <FlatList
        data={opciones}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Item titulo={item.titulo} ruta={item.ruta} imagen={item.imagen} />}
        contentContainerStyle={[styles.listContainer, { backgroundColor: theme.colors.background }]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  appbar: { elevation: 0 },
  listContainer: { flexGrow: 1, paddingVertical: 8 },
  ripple: { overflow: "hidden" },
  itemContainer: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 16, marginHorizontal: 8, marginVertical: 4 },
  itemTitle: { fontSize: 16, fontWeight: "500" },
  squareImage: { width: 44, height: 44, borderRadius: 10, backgroundColor: "#f0f0f0" },
});