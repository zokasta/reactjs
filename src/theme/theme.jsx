import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#A7F3D0",  // Tailwind primary.light
      main: "#54bd95",   // Tailwind primary.DEFAULT
      dark: "#3da97d",   // Tailwind primary.dark
      contrastText: "#fff",
    },
    secondary: {
      light: "#2b434e",
      main: "#081c4e",
      dark: "#161c28",
      contrastText: "#fff",
    },
    grey: {
      100: "#F3F4F6",
      400: "#9CA3AF",
      900: "#111827",
    },
  },
  shape: {
    borderRadius: 12, // matches your rounded theme
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    button: { textTransform: "none", fontWeight: 600 },
  },
});

export default theme;
