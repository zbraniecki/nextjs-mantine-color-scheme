"use client";
import { Text, Box, ActionIcon } from "@mantine/core";
import { useResolvedColorScheme } from "../components/ColorSchemeProvider";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

export function ChromeLayout({ children }: { children: React.ReactNode }) {
  const { resolvedColorScheme, setColorScheme } = useResolvedColorScheme();

  const toggleColorScheme = () => {
    setColorScheme(resolvedColorScheme === "dark" ? "light" : "dark");
  };

  return (
    <Box>
      <Box
        sx={{
          padding: "10px",
          margin: "10px",
          display: "flex",
          flexDirection: "row",
        }}
        className="header"
      >
        <ActionIcon
          variant="outline"
          className="colorSchemeToggleIcon"
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          <IconSun size="1.1rem" className="colorSchemeToggleIconSun" />
          <IconMoonStars size="1.1rem" className="colorSchemeToggleIconStars" />
        </ActionIcon>
        <Text sx={{paddingLeft: "10px" }}>
        Header
        </Text>
      </Box>
      <Box sx={{
        margin: "10px",
      }}>
        {children}
      </Box>
    </Box>
  );
}
