import {
  Text,
  Stack,
  Image,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { HiDotsCircleHorizontal } from "react-icons/hi";
import { AiFillHeart, AiFillCloud } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MovieCard = ({
  movie,
  index,
  handleRemoveMovieFromWatchlistRerender,
  handleRemoveMovieFromFavouriteRerender,
  isShowMenuIcon = false,
  isShowDeleteIcon = false,
  isRemoveFromWatchlist = false,
  isRemoveFromFavourite = false,
}) => {
  function formatDate(inputDate) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(inputDate).toLocaleDateString(undefined, options);
  }
  const formattedDate = formatDate(movie?.release_date);

  const baseImageUrl = "https://image.tmdb.org/t/p/";
  const posterSize = "w500";
  const posterUrl = `${baseImageUrl}${posterSize}${movie?.poster_path}`;

  const navigate = useNavigate();

  const handleAddMovieToFavourite = () => {
    const favouriteMovies =
      JSON.parse(localStorage.getItem("favouriteMovies")) || [];
    favouriteMovies.push(movie);
    localStorage.setItem("favouriteMovies", JSON.stringify(favouriteMovies));
    alert("Added selected movie to favourite list");
  };

  const handleAddMovieToWatchlist = () => {
    const watchlistMovies =
      JSON.parse(localStorage.getItem("watchlistMovies")) || [];
    watchlistMovies.push(movie);
    localStorage.setItem("watchlistMovies", JSON.stringify(watchlistMovies));
    alert("Added selected movie to watchlist");
  };

  const handleRemoveMovie = () => {
    if (isRemoveFromWatchlist) {
      const watchlistMovies =
        JSON.parse(localStorage.getItem("watchlistMovies")) || [];
      watchlistMovies.splice(index, 1);
      localStorage.setItem("watchlistMovies", JSON.stringify(watchlistMovies));
      handleRemoveMovieFromWatchlistRerender(watchlistMovies);
    }

    if (isRemoveFromFavourite) {
      const favouriteMovies =
        JSON.parse(localStorage.getItem("favouriteMovies")) || [];
      favouriteMovies.splice(index, 1);
      localStorage.setItem("favouriteMovies", JSON.stringify(favouriteMovies));
      handleRemoveMovieFromFavouriteRerender(favouriteMovies);
    }
  };

  return (
    <Flex flexDirection={"column"} width={"max"} margin={"auto"}>
      <Box position={"relative"}>
        {isShowDeleteIcon && (
          <Box
            position={"absolute"}
            top={"10px"}
            right={"10px"}
            cursor={"pointer"}
            color="red"
            onClick={handleRemoveMovie}
          >
            <MdCancel size="20px" />
          </Box>
        )}

        {isShowMenuIcon && (
          <Menu>
            <MenuButton
              position={"absolute"}
              top={"0px"}
              right={"0px"}
              as={IconButton}
              aria-label="Options"
              icon={<HiDotsCircleHorizontal size="25px" />}
              variant="none"
              color={"white"}
              _hover={{ color: "gray" }}
            />
            <MenuList>
              <MenuItem
                icon={<AiFillHeart />}
                onClick={handleAddMovieToFavourite}
              >
                Favourite
              </MenuItem>
              <MenuItem
                icon={<AiFillCloud />}
                onClick={handleAddMovieToWatchlist}
              >
                Watchlist
              </MenuItem>
            </MenuList>
          </Menu>
        )}

        <Image
          height={"220px"}
          width={"150px"}
          src={posterUrl}
          alt={movie?.title}
          borderRadius="lg"
          cursor={"pointer"}
          onClick={() => navigate(`/movie/${movie?.id}`)}
        />
      </Box>

      <Stack mt="2" spacing="1" pl="10px" width={"150px"}>
        <Text fontSize={"15px"} fontWeight={500} isTruncated>
          {movie?.title}
        </Text>
        <Text>{formattedDate}</Text>
      </Stack>
    </Flex>
  );
};

export default MovieCard;
