import React, { useEffect, useState } from "react";
import LogoutButton from "../Auth/LogoutButton";
import { Box, Grid, Heading } from "@chakra-ui/react";
import MovieCard from "../Movie/MovieCard";
import Footer from "../Footer/Footer";

const Favourites = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchFavouriteMovies = () => {
    return new Promise((resolve, reject) => {
      try {
        const favouriteMovies =
          JSON.parse(localStorage.getItem("favouriteMovies")) || [];
        resolve(favouriteMovies);
      } catch (error) {
        reject(error);
      }
    });
  };

  const loadMoviesData = async () => {
    try {
      setLoading(true);
      const data = await fetchFavouriteMovies();
      setMoviesData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleRemoveMovieFromFavouriteRerender = (updatedList) => {
    setMoviesData(updatedList);
  };

  useEffect(() => {
    loadMoviesData();
  }, []);

  return (
    <div style={{ minH: "100vh" }}>
      <LogoutButton />
      <Heading textAlign={"center"}>Favourite</Heading>
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
              {moviesData &&
                moviesData.map((movie, index) => {
                  return (
                    <MovieCard
                      key={index}
                      index={index}
                      movie={movie}
                      isShowDeleteIcon={true}
                      isRemoveFromFavourite={true}
                      handleRemoveMovieFromFavouriteRerender={
                        handleRemoveMovieFromFavouriteRerender
                      }
                    />
                  );
                })}
            </Grid>
          )}
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default Favourites;
