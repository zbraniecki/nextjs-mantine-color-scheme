"use client";

import { CacheProvider } from "@emotion/react";
import { useEmotionCache, MantineProvider } from "@mantine/core";
import { useServerInsertedHTML } from "next/navigation";
import {
  ColorSchemeProvider,
  useResolvedColorScheme,
} from "./ColorSchemeProvider";

function MantineThemeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedColorScheme } = useResolvedColorScheme();

  return (
    <MantineProvider
      theme={{ colorScheme: resolvedColorScheme }}
      withCSSVariables
      withNormalizeCSS
    >
      {children}
    </MantineProvider>
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <ColorSchemeProvider>
          <MantineThemeProvider>{children}</MantineThemeProvider>
      </ColorSchemeProvider>
    </CacheProvider>
  );
}
