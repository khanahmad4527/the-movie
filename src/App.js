import { Routes, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Movie from "./components/Movie/Movie";
import { AuthContextProvider } from "./hoc/AuthContext";
import AuthProtectedRoutes from "./hoc/AuthProtectedRoutes";
import Watchlist from "./components/Watchlist/Watchlist";
import Favourites from "./components/Favourites/Favourites";
import MovieDetail from "./components/Movie/MovieDetail";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/movie"
          element={
            <AuthProtectedRoutes>
              <Movie />
            </AuthProtectedRoutes>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <AuthProtectedRoutes>
              <MovieDetail />
            </AuthProtectedRoutes>
          }
        />
        <Route
          path="/favourites"
          element={
            <AuthProtectedRoutes>
              <Favourites />
            </AuthProtectedRoutes>
          }
        />
        <Route
          path="/watchlist"
          element={
            <AuthProtectedRoutes>
              <Watchlist />
            </AuthProtectedRoutes>
          }
        />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
