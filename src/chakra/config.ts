import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        fontFamily: "Inter",
        color: mode("gray.800", "whiteAlpha.900")(props),
        bg: mode("white", "#16161629")(props),
      },
    }),
  },
});
