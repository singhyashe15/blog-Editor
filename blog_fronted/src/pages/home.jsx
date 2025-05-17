import { Avatar, Box, Button, Divider, Flex, HStack, Icon, IconButton, Input, VStack, Stack, Text, Menu, MenuList, MenuButton, MenuItem, useBreakpointValue, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {useQuery} from '@tanstack/react-query';
import { FaUserCircle,FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";

export default function Home() {
  const [isExist, setIsExist] = useState(false);
  const StackComponent = useBreakpointValue({ base: VStack, md: HStack })
  const CategoryComponent = useBreakpointValue({ base: HStack, md: VStack })
  const navigate = useNavigate()
  let user = null;
  // get the user details
  useEffect(() => {
    user = JSON.parse(localStorage.getItem("users"));
    if (user) {
      setIsExist(true)
    }
  }, []);

  // write a post
  const handlePost = () => {
    if(user){
      navigate('/blog-post', {replace : true})
    }else{
      toast("Login First");
    }
  }

  const getPosts = async() => {
    const url = import.meta.env.VITE_SERVER_URL;
    const res = await axios.get(`${url}/blogs/getCurrentBlogs`);
    console.log(res);
    return [];
  }
  // get all recent post
  const {data, isLoading} = useQuery({
    queryKey : "postsThisMonth",
    queryFn:getPosts(),
  })
  return (
    <Flex w="full" h="100%" direction="column">
      {/* navbar */}
      <HStack w="100%" justify="space-between">
        {/* Left Side */}
        <HStack align="start" spacing="3">
          <Text fontSize="2xl" fontWeight="bold">Blog</Text>
          <Input placeholder="Search" size="sm" rounded="full" />
        </HStack>

        {/* Right Side */}
        <HStack spacing="4">
          <IconButton aria-label="Search" onClick={()=>handlePost()}>
            <Icon as={FaEdit} alt="write" title="Write a Post" />
          </IconButton>

          {!isExist ? (
            <Menu>
              <MenuButton as={Button} rightIcon={<FaUserCircle />}>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate('/profile' , {replace:true})}>Dashboard</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem color="red.500" onClick={()=>navigate('/logout', {replace: true})}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button m="4" colorScheme="teal">
              LoginIn
            </Button>
          )}
        </HStack>
      </HStack>

      <StackComponent justify="center">
        <VStack w="50%" mt="8">
          <Text fontSize="xl" fontWeight="semibold">Explore the Latest Tech & Web Trends</Text>
          <Text>Stay ahead with in-depth articles , tutorials and insights on web development , digital marketing and tech innovations.</Text>
        </VStack>
        <VStack>
          <Image src="" alt="Image" />
        </VStack>
      </StackComponent>

      <Divider mt="4" size="md" />

      <Text fontSize="lg" fontWeight="semibold">Recent Blogs</Text>
      {/* all recent blogs */}
      <Stack direction={{ base: "column-reverse", md: "row" }} spacing={8} align="center" mt="4" >
        <VStack spacing={8} p={4} w="75%">
          <StackComponent spacing="8" rounded="xl" w="75%" bg="gray.100" px="4" py="8">
            <Box w="40%">
              <Image src="Screenshot 2025-04-20 160426.png" alt="pic" />
            </Box>
            <VStack align="start" w="auto" alignItems="center">
              <Text fontWeight="semibold">How to Survive in nature</Text>
              <Button colorScheme="teal" variant="solid">Read more!</Button>
            </VStack>
          </StackComponent>
        </VStack>
        {/* list of categories */}
        <VStack p={4} w={{ base: 'full', md: 'auto' }}>
          <Text fontWeight="semibold" fontSize="lg" align="left" mb={2}>
            Popular Categories
          </Text>

          {/* Scrollable container only for buttons */}
          <Box overflowX="auto" whiteSpace="nowrap" maxW="100%" sx={{ scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' }, }}>
            <CategoryComponent spacing={3} w="max-content">
              <Button colorScheme="teal" variant="solid" rounded="full">Programming</Button>
              <Button colorScheme="teal" variant="solid" rounded="full">HollyWood</Button>
              <Button colorScheme="teal" variant="solid" rounded="full">Film Making</Button>
              <Button colorScheme="teal" variant="solid" rounded="full">Social Media</Button>
              <Button colorScheme="teal" variant="solid" rounded="full">Cooking</Button>
            </CategoryComponent>
          </Box>
        </VStack>
      </Stack>
    </Flex>
  )
}