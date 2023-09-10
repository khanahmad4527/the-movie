import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import axios from "axios";
import Footer from "../Footer/Footer";
import MovieCard from "./MovieCard";
import LogoutButton from "../Auth/LogoutButton";
import Pagination from "./Pagination";

const Movie = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [genre, setGenre] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(100);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const genreData = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ];

  const loadMoviesData = async () => {
    try {
      setLoading(true);
      let apiUrl;
      if (searchQuery) {
        // If a search query is provided, use the search endpoint
        apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB}&query=${searchQuery}&language=en-US&page=${page}&include_adult=false`;
      } else {
        // If no search query is provided, use the discover endpoint
        apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.REACT_APP_TMDB
        }&with_genres=${genre.join(
          ","
        )}&language=en-US&sort_by=popularity.desc&include_adult=false&page=${page}`;
      }
      const data = await axios.get(apiUrl);
      setTotalResults(data?.data?.total_results);
      setMoviesData(data?.data?.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    //page load at top
    window.scrollTo(0, 0);

    loadMoviesData();
  }, [page]);

  const handleSearch = () => {
    loadMoviesData();
  };

  const paginate = (value) => {
    setPage(Number(value));
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

          <Flex mt="20px" alignItems={"center"} flexWrap={"wrap"}>
            <Menu
              closeOnSelect={false}
              onClose={() => {
                if (genre.length !== 0) {
                  loadMoviesData();
                }
              }}
            >
              <MenuButton as={Button} colorScheme="blue">
                Select genre
              </MenuButton>
              <MenuList bg="#032541">
                <CheckboxGroup
                  colorScheme="green"
                  value={genre}
                  onChange={setGenre}
                >
                  <Flex
                    gap={"10px"}
                    flexWrap={"wrap"}
                    padding={"20px"}
                    w={"500px"}
                  >
                    {genreData.map((genre) => (
                      <Checkbox key={genre.id} value={genre.id.toString()}>
                        {genre.name}
                      </Checkbox>
                    ))}
                  </Flex>
                </CheckboxGroup>
              </MenuList>
            </Menu>
          </Flex>
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
                  return (
                    <MovieCard
                      key={index}
                      index={index}
                      movie={movie}
                      isShowMenuIcon={true}
                    />
                  );
                })}
            </Grid>
          )}
        </Box>

        <Pagination
          onChange={paginate}
          totalCount={totalResults}
          currentPage={page}
          pageSize={20}
          onPageChange={paginate}
        />
      </Box>
      <Footer />
    </>
  );
};

export default Movie;
