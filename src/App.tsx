// #ARCHITECTURE: Main application entry point with global providers
// #THEME: ThemeProvider wraps entire app for dark/light mode support
// #AUTH: AuthProvider manages Firebase authentication state globally
import { AuthProvider } from "@src/contexts/AuthContext";
import { ThemeProvider } from "@src/contexts/ThemeContext";
import AppRouter from "@src/routes";
import "./App.css";
import { Toast } from "./components/ui";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
        <Toast />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
