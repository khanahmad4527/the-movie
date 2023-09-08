import React, { useEffect, useState } from "react";
import { UserAuth } from "../../hoc/AuthContext";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import Footer from "../Footer/Footer";
import MovieCard from "./MovieCard";
import LogoutButton from "../Auth/LogoutButton";

const Movie = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadMoviesData = async () => {
    try {
      setLoading(true);
      const data = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB}&language=en-US&sort_by=popularity.desc&include_adult=false&page=1`
      );
      setMoviesData(data?.data?.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    loadMoviesData();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Handle the search logic here, e.g., perform an API search.
    console.log(`Searching for: ${searchQuery}`);
  };

  return (
    <>
      <LogoutButton />
      <Box>
        <Box
          bg="#032541"
          width={"90%"}
          margin={"auto"}
          color={"white"}
          padding={"50px 40px"}
        >
          <Heading>Welcome.</Heading>
          <Text fontSize={"25px"}>
            Millions of movies, TV shows and people to discover. Explore now.
          </Text>

          <Box mt={"50px"}>
            <InputGroup>
              <Input
                type="text"
                placeholder="Search for a movie"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                bg="white"
                color={"gray"}
              />
              <InputRightElement width="4.5rem">
                <Button
                  colorScheme="blue"
                  h="1.75rem"
                  size="sm"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>

        <Box width={"80%"} m={"50px auto"}>
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
                  return <MovieCard key={index} {...movie} />;
                })}
            </Grid>
          )}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Movie;
