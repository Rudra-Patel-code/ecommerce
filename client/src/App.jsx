import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Layout/Header";
import ProtectedRoute from "./utils/ProtectedRoute";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "./utils/Loader";
import { loadData } from "./redux/actions/authActions";

function App() {
  const { loading, isAuth, error, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, message, dispatch]);

  useEffect(() => {
    dispatch(loadData());
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
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

              <Route path="/loading" element={<Loader />} />
            </Routes>
            <Toaster />
          </Router>
        </>
      )}
    </>
  );
}

export default App;
