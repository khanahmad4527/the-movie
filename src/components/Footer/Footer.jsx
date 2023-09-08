import { Box, Flex, Link } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Box>
      <Flex
        bg="#032541"
        color={"white"}
        alignItems={"center"}
        justifyContent={"space-around"}
        padding={"20px"}
        fontSize={"20px"}
      >
        <Link href="/movie">Movies</Link>
        <Link href="/favourites">Favourites</Link>
        <Link href="/watchlist">Watchlist</Link>
      </Flex>
    </Box>
  );
};

export default Footer;
