import { Avatar, Box, Button, Divider, Flex, HStack, VStack, Stack, Text, useBreakpointValue, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
import { useBlog } from "../context/blogcontext.jsx";

export default function Home() {
  const [blog, setBlog] = useState([])
  const StackComponent = useBreakpointValue({ base: VStack, md: HStack })
  const CategoryComponent = useBreakpointValue({ base: HStack, md: VStack })
  const { search, setSearch } = useBlog();
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
      if (res.data.success) {
        setBlog(res.data.blogbyCategory)
      }
    }
    getPosts();

  }, [search]);

  const getAllPosts = async () => {
    const url = import.meta.env.VITE_SERVER_URL;
    const res = await axios.get(`${url}/api/blogs`);
    console.log(res);
    return res.data.success ? res.data.allBlogs : [];
  }
  // get all recent post
  const { data } = useQuery({
    queryKey: "postsThisMonth",
    queryFn: getAllPosts(),
  })

  const handleCategory = (category) => {
    setSearch(category)
  }

  const handleRead = (id) => {
    if (user) {
      navigate(`/blog/${id}`);
    } else {
      toast("Login at first to read the blogs");
    }
  }

  return (
    <Flex w="100%" h="100%" direction="column" justify="center" align="center">
      {
        !search &&
        <StackComponent justify="center" mt="8" spacing="8">
          <VStack w={{ base: '100%', md: '50%' }} mt="8" px="4">
            <Text fontSize="4xl" fontWeight="semibold">Explore the Latest Tech & Web Trends</Text>
            <Text>Stay ahead with in-depth articles, tutorials and insights on web development, digital marketing and tech innovations.</Text>
          </VStack>
          <VStack w={{ base: '100%', md: '50%' }}>
            <Image src="blog.avif" alt="Image" boxSize={{ base: '80%', md: '85%' }} objectFit="cover" rounded="xl" />
          </VStack>
        </StackComponent>
      }

      <Divider mt="8" size="md" />

      <Text fontSize="xl" fontWeight="semibold">Recent Blogs</Text>

      <Stack direction={{ base: "column-reverse", md: "row" }} spacing={8} align="center" mt="4" w="100%">
        <VStack spacing={8} p={4} w="75%">
          {blog?.length === 0 ?
            data?.map((blog) => {
              return (
                <StackComponent key={blog?.id} spacing="8" rounded="xl" w="75%" bg="gray.100" px="4" py="8">
                  <Box w="40%">
                    <Image src={blog?.imageUrl} alt="pic" />
                  </Box>
                  <VStack align="start" w="auto" alignItems="center">
                    <Text fontWeight="semibold">{blog?.title}</Text>
                    <Button colorScheme="teal" variant="solid" onClick={() => handleRead(blog?.id)}>Read more!</Button>
                  </VStack>
                </StackComponent>
              )
            })
            :
            blog?.map((blog) => {
              return (
                <StackComponent key={blog?.id} spacing="8" rounded="xl" w="75%" bg="gray.100" px="4" py="8">
                  <Box w="40%">
                    <Image src={blog?.imageUrl} alt="pic" />
                  </Box>
                  <VStack align="start" w="auto" alignItems="center">
                    <Text fontWeight="semibold">{blog?.title}</Text>
                    <Button colorScheme="teal" variant="solid" onClick={() => handleRead(blog?.id)}>Read more!</Button>
                  </VStack>
                </StackComponent>
              )
            })
          }
        </VStack>

        <VStack p={4} w={{ base: '100%', md: 'auto' }} maxW="100%" overflow="hidden" align="start">
          <Text fontWeight="semibold" fontSize="lg" align="left" mb={2} alignSelf="center">
            Popular Categories
          </Text>

          <Box
            overflowX="auto"
            whiteSpace="nowrap"
            width="100%"
            maxW="100%"
            sx={{
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <CategoryComponent display="inline-flex" gap="12px">
              <Button colorScheme="teal" rounded="full" onClick={() => handleCategory("Programming")}>Programming</Button>
              <Button colorScheme="teal" rounded="full" onClick={() => handleCategory("HollyWood")}>HollyWood</Button>
              <Button colorScheme="teal" rounded="full" onClick={() => handleCategory("Film Making")}>Film Making</Button>
              <Button colorScheme="teal" rounded="full" onClick={() => handleCategory("Social Media")}>Social Media</Button>
              <Button colorScheme="teal" rounded="full" onClick={() => handleCategory("Cooking")}>Cooking</Button>
            </CategoryComponent>
          </Box>
        </VStack>
      </Stack>
    </Flex>

  )
}