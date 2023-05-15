import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Layout/Header";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { Toaster } from "react-hot-toast";

function App() {
  const isAuth = false;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />} />

        <Route
          path="/login"
          element={
            <ProtectedRoute isAllowed={!isAuth} to={"/"}>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path="/register"
          element={
            <ProtectedRoute isAllowed={!isAuth} to={"/"}>
              <Register />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
