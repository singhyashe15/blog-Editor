import { Avatar, Box, Button, Divider, Flex, HStack, VStack, Stack, Text, useBreakpointValue, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
import { useBlog } from "../context/blogcontext.jsx";

export default function Home() {

  const StackComponent = useBreakpointValue({ base: VStack, md: HStack })
  const CategoryComponent = useBreakpointValue({ base: HStack, md: VStack })
  const { search,setSearch } = useBlog();
  const navigate = useNavigate();

  let user = null;
  // get the user details
  useEffect(() => {
    user = JSON.parse(localStorage.getItem("users"));
    if (user) {
      setIsExist(true)
    }
  }, []);

  useEffect(() => {
    async function getPosts() { 
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await axios.get(`${url}/api/blogs/category/${search}`);
      
    }
    getPosts();

  }, [search]);

  // const getPosts = async () => {
  //   const url = import.meta.env.VITE_SERVER_URL;
  //   const res = await axios.get(`${url}/api/blogs/getCurrentBlogs`);
  //   console.log(res);
  //   return [];
  // }
  // // get all recent post
  // const { data, isLoading } = useQuery({
  //   queryKey: "postsThisMonth",
  //   queryFn: getPosts(),
  // })

  const handleCategory = (category) => {
    setSearch(category)
  }
  
  const handleRead = (id) => {
    if (user) {
      navigate(`/read-blog/${id}`);
    } else {
      toast("Login at first to read the blogs");
    }
  }

  return (
    <Flex w="100%" h="100%" direction="column" justify="center" align="center" >
      {
        !search &&
        <StackComponent justify="center" mt="8" spacing="8">
          <VStack w={{ base: '100%', md: '50%' }} mt="8" px="4">
            <Text fontSize="4xl" fontWeight="semibold">Explore the Latest Tech & Web Trends</Text>
            <Text>Stay ahead with in-depth articles , tutorials and insights on web development , digital marketing and tech innovations.</Text>
          </VStack>
          <VStack w={{ base: '100%', md: '50%' }}>
            <Image src="blog.avif" alt="Image" boxSize={{ base: '80%', md: '85%' }} objectFit="cover" rounded="xl" />
          </VStack>
        </StackComponent>
      }

      <Divider mt="8" size="md" />

      <Text fontSize="xl" fontWeight="semibold">Recent Blogs</Text>
      {/* all recent blogs */}
      <Stack direction={{ base: "column-reverse", md: "row" }} spacing={8} align="center" mt="4" >
        <VStack spacing={8} p={4} w="75%">
          <StackComponent spacing="8" rounded="xl" w="75%" bg="gray.100" px="4" py="8">
            <Box w="40%">
              <Image src="Screenshot 2025-04-20 160426.png" alt="pic" />
            </Box>
            <VStack align="start" w="auto" alignItems="center">
              <Text fontWeight="semibold">How to Survive in nature</Text>
              <Button colorScheme="teal" variant="solid" onClick={() => handleRead()}>Read more!</Button>
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
              <Button colorScheme="teal" variant="solid" rounded="full" onClick={()=>handleCategory("Programming")}>Programming</Button>
              <Button colorScheme="teal" variant="solid" rounded="full" onClick={()=>handleCategory("HollyWood")}>HollyWood</Button>
              <Button colorScheme="teal" variant="solid" rounded="full" onClick={()=>handleCategory("Film Making")}>Film Making</Button>
              <Button colorScheme="teal" variant="solid" rounded="full" onClick={()=>handleCategory("Social Media")}>Social Media</Button>
              <Button colorScheme="teal" variant="solid" rounded="full" onClick={()=>handleCategory("Cooking")}>Cooking</Button>
            </CategoryComponent>
          </Box>
        </VStack>
      </Stack>
    </Flex>
  )
}