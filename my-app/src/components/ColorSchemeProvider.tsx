import { createContext, useContext } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { useMediaQuery } from "@mantine/hooks";

export type ColorScheme = "dark" | "light" | undefined;

interface ColorSchemeContextProps {
  colorScheme: ColorScheme;
  setColorScheme: (colorScheme: ColorScheme) => void;
}

const ColorSchemeContext = createContext<ColorSchemeContextProps>({
  colorScheme: undefined,
  setColorScheme: () => {
    /* */
  },
});

export function useColorScheme() {
  const ctx = useContext(ColorSchemeContext);

  if (!ctx) {
    throw new Error("Called useColorScheme outside of context");
  }

  return ctx;
}

export function useResolvedColorScheme() {
  const ctx = useContext(ColorSchemeContext);

  if (!ctx) {
    throw new Error("Called useResolvedColorScheme outside of context");
  }
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const resolvedColorScheme =
    ctx.colorScheme ?? (prefersDarkMode ? "dark" : "light");

  return { resolvedColorScheme, setColorScheme: ctx.setColorScheme };
}

export function ColorSchemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: undefined,
    getInitialValueInEffect: true,
  });

  if (colorScheme !== undefined) {
    if (colorScheme === "light") {
      document.documentElement.dataset["colorScheme"] = "light";
    } else if (colorScheme === "dark") {
      document.documentElement.dataset["colorScheme"] = "dark";
    }
  }

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
}
