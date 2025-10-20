import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: { main: "#ff9800" },
        secondary: { main: "#4caf50" },
    },
    typography: {
        fontFamily: "'Roboto', sans-serif",
        h5: { fontWeight: 700 },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
                },
            },
        },
    },
});
