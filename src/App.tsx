import { ThemeProvider } from "./components/theme-provider";
import Home from "./pages/home";
import LoginPage from "./pages/login";
import AdminPanel from "./pages/admin";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { createHashRouter, RouterProvider, Navigate } from "react-router-dom";

const router = createHashRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/admin",
      element: <LoginPage />,
    },
    {
      path: "/admin/dashboard",
      element: (
        <ProtectedRoute>
          <AdminPanel />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]
);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
