import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import CentreLocator from "./pages/centre/centreLocator";
import { theme } from "./theme/theme";
import { colorAssets } from "./assets/colorAssests";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: colorAssets.primaryBackground,
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<CentreLocator />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
