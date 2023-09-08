import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { UserAuth } from '../../hoc/AuthContext';

const LogoutButton = () => {
    const { logOut } = UserAuth();
    const handleLogout = async () => {
        try {
          await logOut();
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <Flex
    position={"sticky"}
    justifyContent={"right"}
    top={"10px"}
    mr="10px"
    zIndex={1}
  >
    <Button colorScheme="red" onClick={handleLogout}>
      Logout
    </Button>
  </Flex>
  )
}

export default LogoutButton