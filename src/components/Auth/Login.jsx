import React, { useEffect } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../../hoc/AuthContext";
import { useNavigate } from "react-router-dom";
import { Flex, Heading } from "@chakra-ui/react";

const Login = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/movie");
    }
  }, [navigate, user]);

  return (
    <Flex flexDir={"column"} gap={"20px"} mt={"50px"}>
      <Heading textAlign={"center"}>Sign in</Heading>
      <Flex justifyContent={"center"}>
        <GoogleButton onClick={handleGoogleSignIn} />
      </Flex>
    </Flex>
  );
};

export default Login;
