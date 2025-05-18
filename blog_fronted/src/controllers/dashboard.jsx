import { Avatar, Box, Flex, HStack, Stack, Text, useBreakpointValue, VStack, Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const StackComponent = useBreakpointValue({ base: VStack, md: HStack })
  // store user detail
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log(location)
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  // get all the post 
  const getSelfPost = async () => {
    const url = import.meta.env.VITE_SERVER_URL;
    const res = await axios.get(`${url}/self/${user.id}`);
    return res.data.success ? res.data.post : []
  }

  const { data } = useQuery({
    queryKey: "SelfPost",
    queryFn: getSelfPost(),
    staleTime: 10000
  })

  return (
    <Stack spacing={10} direction="column" p={4}  mx="8" mt="8" shadow="lg">
      <StackComponent spacing={10}>
        <Box justify="center" align="center" spacing={4} flexShrink={0}>
          <Avatar size={{ base: "lg", md: "2xl" }} />
        </Box>
        <VStack>
          <Text fontSize="xl" fontWeight="semibold">{user?.name || "Guest"}</Text>
          <Text fontSize="lg" fontWeight="semibold">{user?.bio || "its a blog-editor page"}</Text>
          <HStack>
            <Text fontSize="lg" fontWeight="semibold">Total Blogs : { }</Text>
            <Text fontSize="lg" fontWeight="semibold">Draft Blogs : { }</Text>
          </HStack>
        </VStack>
      </StackComponent>
      <Box w="100%" mt={4}>
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="2em" mx="8">
            <Tab>Published Blog</Tab>
            <Tab>Draft Blog</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {
                data?.allPublishedBlog?.map((blog) => {
                  return (
                    <HStack key={blog?.id} spacing="8" rounded="xl" w="75%" bg="gray.100" px="4" py="8">
                      <Box w="40%">
                        <Image src={blog?.imageUrl} alt="pic" />
                      </Box>
                      <VStack align="start" w="auto" alignItems="center">
                        <Text fontWeight="semibold">{blog?.title}</Text>
                        <Text fontSize="xl" fontWeight="semibold">Published at : {moment(blog?.updated_at).format(DD-MM-YYYY)}</Text>
                      </VStack>
                    </HStack>
                  )
                })
              }
            </TabPanel>
            <TabPanel>
              {
                data?.allDraftBlog?.map((blog) => {
                  return (
                    <HStack key={blog?.id} spacing="8" rounded="xl" w="75%" bg="gray.100" px="4" py="8">
                      <Box w="40%">
                        <Image src={blog?.imageUrl} alt="pic" />
                      </Box>
                      <VStack align="start" w="auto" alignItems="center">
                        <Text fontSize="xl" fontWeight="semibold">{blog?.title}</Text>
                        <Text fontSize="lg" fontWeight="200" my="2">{blog?.content}</Text>
                        <Text fontSize="xl" fontWeight="semibold">Drafted at : {moment(blog?.updated_at).format("DD-MM-YYYY")}</Text>
                      </VStack>
                    </HStack>
                  )
                })
              }
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Stack>
  )
}