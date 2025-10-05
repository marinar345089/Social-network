import { Theme } from "@radix-ui/themes";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Header from "./components/Header";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import Favourites from "./pages/Favourites";
import { useSelector } from "react-redux";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { theme } = useSelector((store) => store.theme);
  return (
    <Theme accentColor="plum" radius="full" appearance={theme}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LogIn />} />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/favourites"
          element={
            <ProtectedRoute>
              <Favourites />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Theme>
  );
}

export default App;
