import { Box, Button, Flex, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Logout(){
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('user',null);
  }
  return(
    <Flex align="center" justify="center" w="100%" h="100%">
      <Box border="1px" borderColor="teal" p="4" rounded="lg">
        <Text fontSize="lg" fontWeight="semibold">Are you sure want to logout!!</Text>
        <HStack mt="4" alignItems="center">
          <Button colorScheme="teal" variant="solid" onClick={()=>navigate('/',{replace:true})}>Back</Button>
          <Button colorScheme="teal" variant="solid" onClick={handleLogout()}>Logout</Button>
        </HStack>
      </Box>
    </Flex>
  )
}