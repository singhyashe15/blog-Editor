import { Box, Button,  HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear the localStorage
    localStorage.setItem('user', null);
    navigate('/register',{replace:true})
  }
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="auto" width="auto">
      <Box width={['90%', '70%', '30%']} bg="slate.500" color="black" border="2px solid" borderColor="blue.400" borderRadius="lg" boxShadow="md" textAlign="center" p="8">
        <Text fontSize="lg" fontWeight="semibold">Are you sure want to logout!!</Text>
        <HStack display="flex" justifyContent="center" alignItems="center">
          <Button colorScheme="teal" variant="solid" onClick={() => navigate('/', { replace: true })}>Back</Button>
          <Button colorScheme="teal" variant="solid" onClick={handleLogout()}>Logout</Button>
        </HStack>
      </Box>
    </Box>
  )
}