import { ThemeProvider } from "./components/theme-provider";
import AdminPanel from "./pages/admin";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AdminPanel />
    </ThemeProvider>
  );
}

export default App;
