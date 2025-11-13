import { AuthProvider } from "@src/contexts/AuthContext";
import { ThemeProvider } from "@src/contexts/ThemeContext";
import AppRouter from "@src/routes";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "var(--color-primary-600)",
              color: "#fff",
            },
            success: {
              iconTheme: {
                primary: "var(--color-primary-600)",
                secondary: "#fff",
              },
            },
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
