import { Box, HStack, Spinner, Text } from "@chakra-ui/react"
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(async () => {
    const verifyToken = async () => {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/verifyToken`, {
        withCredentials: true
      });
      localStorage.setItem('user',JSON.stringify(res.data.user));
      navigate('/', { replace: true });
    }

    verifyToken();
    return ()=>verifyToken();
  }, []);
  
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh" width="100vw">
      <Box width={['90%', '70%', '30%']} bg="green.200" color="white" border="2px solid" p="4" borderColor="blue.400" borderRadius="lg" textAlign="center">
        <HStack>
          <Spinner color="teal.500" size="lg" />
          <Text fontStyle="italic" fontFamily="cursive" fontSize="lg">Authenticating</Text>
        </HStack>
      </Box>
    </Box>
  )
}

export default Auth;