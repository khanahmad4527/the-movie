import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  VisuallyHidden,
  List,
  ListItem,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdLocalShipping } from "react-icons/md";
import { useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import LogoutButton from "../Auth/LogoutButton";

export default function MovieDetail() {
  const { id } = useParams();

  const [movieData, setMovieData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const loadMoviesData = async () => {
    try {
      setLoading(true);
      const data = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB}`
      );
      setMovieData(data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    if (id) {
      loadMoviesData();
    }
  }, [id]);

  //function to convert date into readable format
  function formatDate(inputDate) {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(inputDate).toLocaleDateString(undefined, options);
  }
  const formattedDate = formatDate(movieData?.release_date);

  // code to get image URL
  const baseImageUrl = "https://image.tmdb.org/t/p/";
  const posterSize = "original";
  const posterUrl = `${baseImageUrl}${posterSize}${movieData?.poster_path}`;

  //function to convert in to millions
  function convertToMillions(number) {
    return (number / 1_000_000).toFixed(2) + "M";
  }
  const numberInMillions = convertToMillions(movieData?.budget);

  //function to convert runtime into readable format
  function minutesToHoursAndMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const hoursText = hours > 0 ? `${hours}h` : "";
    const minutesText = remainingMinutes > 0 ? `${remainingMinutes}m` : "";

    return `${hoursText} ${minutesText}`.trim();
  }
  const formattedDuration = minutesToHoursAndMinutes(movieData?.runtime);

  console.log(movieData);

  return (
    <>
      <LogoutButton />
      <Container maxW={"7xl"}>
        {loading ? (
          <p>Loading....</p>
        ) : error ? (
          <p>Error....</p>
        ) : (
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <Flex>
              <Image
                rounded={"md"}
                alt={movieData?.title}
                src={posterUrl}
                fit={"contain"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "700px" }}
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                >
                  {movieData?.title}
                </Heading>
                <Text color="gray.900" fontWeight={300} fontSize={"2xl"}>
                  Release Date: {formattedDate}
                </Text>

                <Flex mt={"20px"} alignItems={"center"} gap={"5px"}>
                  <CircularProgress
                    value={movieData?.vote_average * 10}
                    color="green.400"
                    size="80px"
                  >
                    <CircularProgressLabel fontWeight={500}>
                      {Math.floor(movieData?.vote_average * 10)}%
                    </CircularProgressLabel>
                  </CircularProgress>
                  <Text fontSize={"20px"} fontWeight={500}>
                    User Score
                  </Text>
                </Flex>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={<StackDivider borderColor="gray.900" />}
              >
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text fontSize={"lg"}>{movieData?.overview}</Text>
                </VStack>

                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color="yellow.500"
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Movie Details
                  </Text>

                  <List spacing={2}>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Budget:
                      </Text>{" "}
                      {numberInMillions}
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Popularity:
                      </Text>{" "}
                      {movieData?.popularity}
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Release Date:
                      </Text>{" "}
                      {formattedDate}
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Runtime:
                      </Text>{" "}
                      {formattedDuration}
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Genres:
                      </Text>{" "}
                      {movieData?.genres?.map((genre, index) => {
                        if (index + 1 < movieData?.genres?.length) {
                          return genre?.name + ", ";
                        } else {
                          return genre?.name;
                        }
                      })}
                    </ListItem>
                  </List>
                </Box>
              </Stack>

              <Button
                rounded={"none"}
                w={"full"}
                mt={8}
                size={"lg"}
                py={"7"}
                bg="gray.900"
                color="white"
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
                onClick={() => alert("Movie is Playing")}
              >
                Play Now
              </Button>
            </Stack>
          </SimpleGrid>
        )}
      </Container>
      <Footer />
    </>
  );
}
