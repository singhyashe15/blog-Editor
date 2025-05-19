import { Avatar, Box, Image, HStack, Stack, Flex, Text, useBreakpointValue, Spinner, VStack, Wrap, WrapItem, Tag, TagCloseButton, TagLabel, Tabs, Tab, TabList, TabPanels, TabPanel, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Input, Textarea } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [Loading, setLoading] = useState(false)
  const StackComponent = useBreakpointValue({ base: VStack, md: HStack })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // store user detail
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    console.log(storedUser)
    if (storedUser) {
      setUser(storedUser)
    }
    console.log(user)
  }, [])

  // get all the post 
  const getSelfPost = async () => {
    console.log(user.id)
    const url = import.meta.env.VITE_SERVER_URL;
    const res = await axios.get(`${url}/api/blogs/self/${user.id}`);
    console.log(res)
    return res.data.success ? res.data.post : [];
  }
  // set the data for edit
  const handleEdit = (title, content) => {
    setTitle(title);
    setContent(content);
    onOpen()
  }

  // edit the title,content
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === "content") {
      setContent(value);
    } else if (name === 'tags') {
      setTagInput(value);
    }
  }

  // add the tag
  const handleAddTag = (e) => {
    if (e.key === 'Enter' && tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  // handle removing the tags
  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };


  const { data } = useQuery({
    queryKey: ["SelfPost"],
    queryFn: getSelfPost,
    staleTime: 1000
  })

  const editBlog = async (id) => {
    const blog = {
      title, content, tags, id: user?.id
    }
    const url = import.meta.env.VITE_SERVER_URL;
    const res = await axios.put(`${url}/api/blogs/edit/${id}`, blog);

    if (res.data.success) {
      toast.success("Blog Edited")
    }
    return res.data
  }
  // logic to edit the blog 
  const editPost = useMutation({
    mutationFn: (id) => editBlog(id),
    onSuccess: (updatedPost, variables) => {
      const { id } = variables;
      queryClient.setQueryData(["SelfPost"], (oldData) => {
        if (!oldData) return [];
        return oldData.map((blog) =>
          blog.id === id ? { ...blog, ...updatedPost } : blog
        );
      });
    }
  })


  return (
    <Stack spacing={10} direction="column" p={4} mx="8" mt="8" shadow="lg">
      <StackComponent spacing={10}>
        <Box justify="center" align="center" spacing={4} flexShrink={0}>
          <Avatar size={{ base: "lg", md: "2xl" }} />
        </Box>
        <VStack>
          <Text fontSize="xl" fontWeight="semibold">{user?.name || "Guest"}</Text>
          <Text fontSize="lg" fontWeight="semibold">{data?.user?.rows[0].bio || "its a blog-editor page"}</Text>
          <HStack>
            {/* show total published blogs and draft blogs */}
            <Text fontSize="lg" fontWeight="semibold">Total Blogs : {data?.allPublishedBlog?.rowCount}</Text>
            <Text fontSize="lg" fontWeight="semibold">Draft Blogs : {data?.allDraftBlog?.rowCount}</Text>
          </HStack>
        </VStack>
      </StackComponent>
      {/* list of all pubished and draft blogs */}
      <Box w="100%" mt={4}>
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="2em" mx="8">
            <Tab>Published Blog</Tab>
            <Tab>Draft Blog</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {
                data?.allPublishedBlog?.rows.map((blog) => {
                  return (
                    <HStack key={blog?.id} spacing="8" rounded="xl"  bg="gray.100" px="4" py="8" mt="4" width="100%">
                      <Box w="40%">
                        <Image src={blog.imageUrl} alt="pic" />
                      </Box>
                      <VStack align="start" w="auto" alignItems="center">
                        <Text fontWeight="semibold">{blog?.title}</Text>
                        <Text fontSize="md" my="2"> {blog?.content.split(" ").slice(0, 5).join(" ")}....</Text>
                        <Text fontSize="xl" fontWeight="semibold">Published at : {moment(blog?.updated_at).format('DD-MM-YYYY')}</Text>
                        <HStack>
                          {/* edit the blog */}
                          <Button colorScheme="teal" onClick={() => handleEdit(blog?.title, blog?.content)} >Edit</Button>
                          {/* read the full blog */}
                          <Button colorScheme="teal" onClick={() => navigate(`/blog/${blog?.id}`)} >Read More</Button>
                        </HStack>
                      </VStack>
                    </HStack>
                  )
                })
              }
            </TabPanel>
            <TabPanel>
              {
                data?.allDraftBlog?.rows.map((blog) => {
                  return (
                    <HStack key={blog?.id} spacing="8" rounded="xl" bg="gray.100" px="4" py="8" mt="4" justify="center" align="center" width="100%">
                      <Box w="40%">
                        <Image src={blog?.imageUrl} alt="pic" />
                      </Box>
                      <VStack align="start" w="auto" alignItems="center">
                        <Text fontSize="xl" fontWeight="semibold">{blog?.title}</Text>
                        <Text fontSize="md" my="2"> {blog?.content.split(" ").slice(0, 5).join(" ")}....</Text>
                        <Text fontSize="xl" fontWeight="semibold">Drafted at : {moment(blog?.updated_at).format('DD-MM-YYYY')}</Text>
                        <HStack>
                          {/* edit the blog */}
                          <Button colorScheme="teal" onClick={() => handleEdit(blog?.title, blog?.content)} >Edit</Button>
                          {/* read the full blog */}
                          <Button colorScheme="teal" onClick={() => navigate(`/blog/${blog?.id}`)} >Read More</Button>
                        </HStack>
                      </VStack>
                    </HStack>
                  )
                })
              }
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={4} maxW="350px" margin="auto">
          <ModalCloseButton />
          <ModalHeader align="center" bg="gray.200" mt="8" rounded="full">Edit It</ModalHeader>
          <ModalBody>
            <Flex justify="center" align="center" direction="column">
              <Input alignContent="center" mt="4" fontSize="xl" fontWeight="semibold" name="title" placeholder={title} onChange={handleEditChange} />
              <Textarea mt="8" fontSize="lg" name="content" onChange={handleEditChange}>{content}</Textarea>
              <Input
                placeholder="Enter a tag and press Enter"
                name="tags"
                value={tagInput}
                mt="8"
                onChange={handleEditChange}
                onKeyDown={handleAddTag}
              />
              <Wrap mt={4}>
                {tags?.map((tag) => (
                  <WrapItem key={tag}>
                    <Tag
                      size="md"
                      variant="solid"
                      colorScheme="orange"
                      borderRadius="full"
                      padding="4"
                    >
                      <TagLabel>{tag}</TagLabel>
                      <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </Flex>
            <HStack justify="space-between" align="center" mt="8" >
              <Button colorScheme='teal' onClick={() => onClose()} mt="8">
                Back
              </Button>
              <Button colorScheme='teal'
                disabled={Loading}
                leftIcon={Loading && <Spinner size="md" />}
                mt="8"
                type='submit'
                onClick={() => editPost.mutate(user?.id)}>
                Edit</Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  )
}