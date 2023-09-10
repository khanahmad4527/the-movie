import React, { useEffect, useState } from "react";
import LogoutButton from "../Auth/LogoutButton";
import { Box, Grid, Heading } from "@chakra-ui/react";
import MovieCard from "../Movie/MovieCard";
import Footer from "../Footer/Footer";

const Watchlist = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchWatchlistMovies = () => {
    return new Promise((resolve, reject) => {
      try {
        const watchlistMovies =
          JSON.parse(localStorage.getItem("watchlistMovies")) || [];
        resolve(watchlistMovies);
      } catch (error) {
        reject(error);
      }
    });
  };

  const loadMoviesData = async () => {
    try {
      setLoading(true);
      const data = await fetchWatchlistMovies();
      setMoviesData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleRemoveMovieFromWatchlistRerender = (updatedList) => {
    setMoviesData(updatedList);
  };

  useEffect(() => {
    loadMoviesData();
  }, []);

  return (
    <div style={{ minH: "100vh" }}>
      <LogoutButton />
      <Heading textAlign={"center"}>Watchlist</Heading>
      <Box>
        <Box width={"80%"} m={"50px auto"} minH={"100vh"}>
          {loading ? (
            <Heading>loading...</Heading>
          ) : error ? (
            <Heading>Error...</Heading>
          ) : (
            <Grid
              templateColumns={{
                sm: "repeat(1, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(5, 1fr)",
              }}
              gap={6}
              padding={"10px"}
            >
              {moviesData && moviesData.length === 0 ? (
                <Heading>Empty watchlist</Heading>
              ) : (
                moviesData.map((movie, index) => {
                  return (
                    <MovieCard
                      key={index}
                      index={index}
                      movie={movie}
                      isShowDeleteIcon={true}
                      isRemoveFromWatchlist={true}
                      handleRemoveMovieFromWatchlistRerender={
                        handleRemoveMovieFromWatchlistRerender
                      }
                    />
                  );
                })
              )}
            </Grid>
          )}
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default Watchlist;
