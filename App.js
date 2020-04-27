import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import {
  Appearance,
  AppearanceProvider,
  useColorScheme,
} from "react-native-appearance";
import Main from "./Main";

export default function App() {
  return (
    <AppearanceProvider>
      <PaperProvided />
    </AppearanceProvider>
  );
}

const PaperProvided = () => {
  const colorScheme = useColorScheme();
  // console.log("colorScheme", colorScheme);

  const isDark = colorScheme === "dark";
  // console.log("isDark", isDark);

  const lightTheme = {
    ...DefaultTheme,
    dark: false,
    roundness: 10,
    colors: {
      ...DefaultTheme.colors,
      primary: "#2962ff",
      accent: "#651fff",
    },
  };

  const darkTheme = {
    ...DefaultTheme,
    dark: true,
    mode: "adaptive",
    roundness: 10,
    colors: {
      ...DefaultTheme.colors,
      primary: "#2962ff",
      accent: "#651fff",
      text: "#ffffff",
      background: "#000000",
      surface: "#000000",
      background: "#000000",
    },
  };

  return (
    <PaperProvider theme={isDark ? darkTheme : lightTheme} roundness={10}>
      <Main />
    </PaperProvider>
  );
};
