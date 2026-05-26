import { Stack } from "expo-router";
import { PaperProvider, MD3LightTheme } from "react-native-paper";

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#1976D2",
    secondary: "#FF8A65",
    tertiary: "#4CAF50",
    background: "#E3F2FD",
    surface: "#FFFFFF",
    onPrimary: "#FFFFFF",
    onSecondary: "#FFFFFF",
    onBackground: "#263238",
    onSurface: "#263238",
    outline: "#CFD8DC",
    onSurfaceVariant: "#607D8B",
  },
};

export default function Layout() {
  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}