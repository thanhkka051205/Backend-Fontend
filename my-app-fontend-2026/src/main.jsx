import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login.jsx";
import UserPage from "./pages/user.jsx";
import RegisterPage from "./pages/register.jsx";
import ErrorPage from "./pages/error.jsx";
import Products from "./pages/product.jsx";
import { AuthWrapper } from "./components/context/auth.context.jsx";
import PrivateRoute from "./pages/private.route.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/products",
        element: (
          <PrivateRoute>
            <Products />
          </PrivateRoute>
        ),
      },

      {
        path: "/user",
        element: <UserPage />,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <AuthWrapper>
    <RouterProvider router={router} />
  </AuthWrapper>,

  //</StrictMode>,
);
