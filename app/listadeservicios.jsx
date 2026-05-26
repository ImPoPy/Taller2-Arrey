import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Appbar, List, useTheme } from "react-native-paper";
import { router } from "expo-router";

const servicios = [
  {
    id: "1",
    titulo: "Veterinaria 24h",
    descripcion: "Atención médica urgente y consultas generales para tu mascota.",
    icono: "hospital-box",
  },
  {
    id: "2",
    titulo: "Guardería canina",
    descripcion: "Cuidado diurno con áreas de juego, supervisión profesional y actividades.",
    icono: "dog",
  },
  {
    id: "3",
    titulo: "Paseadores de perros",
    descripcion: "Paseos grupales o individuales para que tu perro haga ejercicio.",
    icono: "walk",
  },
  {
    id: "4",
    titulo: "Baño y estética",
    descripcion: "Corte de uñas, baño medicado, limpieza de oídos y cepillado.",
    icono: "shower",
  },
  {
    id: "5",
    titulo: "Tienda de accesorios",
    descripcion: "Juguetes, camas, correas, comederos y ropa para mascotas.",
    icono: "shopping",
  },
  {
    id: "6",
    titulo: "Seguridad para mascotas",
    descripcion: "Cercos eléctricos, collares GPS y chips de identificación.",
    icono: "shield-lock",
  },
  {
    id: "7",
    titulo: "Entrenamiento canino",
    descripcion: "Clases de obediencia, socialización y modificación de conducta.",
    icono: "paw",
  },
];

export default function ListaServicios() {
  const theme = useTheme();

  const renderItem = ({ item }) => (
    <List.Item
      title={item.titulo}
      description={item.descripcion}
      descriptionNumberOfLines={2}
      left={(props) => <List.Icon {...props} icon={item.icono} />}
      onPress={() => alert(`Has seleccionado: ${item.titulo}`)}
      style={styles.listItem}
    />
  );

  return (
    <>
      <Appbar.Header style={[styles.appbar, { backgroundColor: theme.colors.primary }]}>
        <Appbar.BackAction iconColor="#FFFFFF" onPress={() => router.back()} />
        <Appbar.Content title="Servicios para animales" color="#FFFFFF" />
      </Appbar.Header>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <FlatList
          data={servicios}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: theme.colors.outline }]} />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appbar: { elevation: 0 },
  container: { flex: 1 },
  listContainer: { paddingHorizontal: 16, paddingVertical: 8 },
  listItem: { borderRadius: 12, marginVertical: 4 },
  separator: { height: 1, marginVertical: 4 },
});