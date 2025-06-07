import { Heading, IconButton, Input, Stack, Text, Box, Flex, Wrap, WrapItem, Tag, TagLabel, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, useDisclosure, InputGroup, InputRightElement, Avatar, Image, Center } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom"
import moment from "moment"
import { useRef, useState } from "react";
import { FaPaperPlane, FaThumbsUp, FaThumbsDown, FaHeart, FaLightbulb, FaLaugh } from "react-icons/fa";
import { useSocket } from "../context/socket.jsx";
import { useEffect } from "react";
export default function ReadBlog() {

  const [profile, setProfile] = useState("");
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [icon, setIcon] = useState(null);
  const [toggle, setToggle] = useState(-1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const socket = useSocket();
  const btnRef = useRef()
  const { id } = useParams();

  // set the name of user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setProfile(storedUser);
  }, [])

  // get the post by id
  const getBlogById = async () => {
    console.log(id)
    const url = import.meta.env.VITE_SERVER_URL;
    const res = await axios.get(`${url}/api/blogs/${id}`);
    console.log(res.data);
    return res.data.success ? res.data.post : [];
  }

  const { data } = useQuery({
    queryKey: ["blogId"],
    queryFn: getBlogById,
    staleTime: 100000
  })


  // socket logic
  useEffect(() => {

    if (socket) {
      socket.emit('room', id); // using blog.id as a room for real time communication
      // getting all the comment
      socket.emit('send-comment', id);
      // getting the broadcasted comment
      socket.on('all-comment', (comment) => {
        setAllComments(comment)
        console.log(allComments)
      });

      // if(liked !== -1){
      //   socket.emit('setLike',)
      // }
    }
  }, [socket, id])

  const submitComment = async () => {
    //  sending the comment in real time
    if (comment && socket.connected) {
      socket.emit('comment', {
        roomId: id,
        sender: profile.name,
        sender_id: profile.id,
        comment
      });

      setComment("")
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      submitComment();
    }
  }

  const handleIcon = (icon) => {
    setIcon(icon);
    setToggle(toggle*10);
  }

  return (
    <Stack spacing={6} direction="column" p={6} mx="8" mt={8} shadow="lg" rounded="xl" bg="white">
      {/*BLog Image */}
      <Box w="100%" h="250px" overflow="hidden" rounded="md">
        <Image
          src={data?.blog.rows[0].imageurl}
          alt="Blog cover"
          objectFit="cover"
          w="100%"
          h="100%"
        />
      </Box>

      {/* Author and Date */}
      <Flex justify="space-between" align="center" color="gray.600" fontSize="sm">
        <Text fontWeight="medium">{data?.user?.rows[0]?.name || "Title"}</Text>
        <Text>Published on: {moment(data?.blog.rows[0]?.updated_at).format("DD-MM-YYYY") || "23:05"}</Text>
      </Flex>

      {/* Tags */}
      <Wrap mt={2}>
        {data?.blog.rows[0]?.tags?.map((tag) => (
          <WrapItem key={tag}>
            <Tag
              size="md"
              variant="solid"
              borderRadius="lg"
              padding="4"
            >
              <TagLabel>{tag}</TagLabel>
            </Tag>
          </WrapItem>
        ))}
      </Wrap>


      <Button ref={btnRef} colorScheme='teal' onClick={onOpen} w="36">
        Add a Comment..
      </Button>
      <Divider size="md" />

      <Heading size="md" mb={2} float="left">{data?.blog?.rows[0].title}</Heading>
      <Text float="left">
        {data?.blog?.rows[0].content}
      </Text>

      {/* For Comment Section */}
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xl"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Comment Section</DrawerHeader>

          <DrawerBody>
            {
              allComments.map((comment) => {
                return (
                  <Flex key={comment.id} mt='4' p="2" justify={comment.sender_id === Number(profile.id) && "flex-end"} position="relative" >
                    <Avatar size="sm" cursor="pointer" mt="4" mr="2" ></Avatar>
                    <Flex shadow="md" rounded="xl" p="2" direction="column" >
                      <Text color="gray.400">@{comment.sender}</Text>
                      <Text my="2">
                        {comment.comment}
                      </Text>
                      {toggle === comment.id &&
                        <Flex p="2" bg="white" shadow="md" rounded="full" position="absolute" ml={comment.sender_id === Number(profile.id) ? "-40" : "24"} >
                          {[<FaThumbsUp />, <FaThumbsDown />, <FaHeart />, <FaLightbulb />].map((icon,index) => {
                            return (
                              <IconButton
                                key={index}
                                aria-label="Like"
                                title="like"
                                icon={icon}
                                onClick={() => { handleIcon(icon) }}
                                color='gray.300'
                                bg="blue.300"
                                border="2px"
                                borderColor='gray.300'
                                borderRadius="full"
                                mx="2"
                                _hover={{
                                  bg: 'gray.100',
                                }}
                                _active={{
                                  bg: 'gray.200',
                                }}
                              />
                            )
                          })}
                        </Flex>
                      }
                      <Text color="gray.400" cursor="pointer" onClick={() => setToggle(comment.id)}>
                        {icon !== null && toggle === comment.id * 10 ?
                          <IconButton
                            icon={icon}
                            color='gray.400'
                            border="2px"
                            borderColor='gray.300'
                            borderRadius="full"
                            bg="blue.800"
                            mx="2"
                            _hover={{
                              bg: 'gray.100',
                            }}
                            _active={{
                              bg: 'gray.200',
                            }}
                          />

                          : "Like"}
                      </Text>
                    </Flex>
                  </Flex>
                )
              })
            }
            {
              allComments.length === 0 &&
              <Center>
                <Text>No Comment yet!!</Text>
              </Center>
            }
          </DrawerBody>

          <DrawerFooter>
            <InputGroup>
              <InputRightElement cursor="pointer" onClick={submitComment}>
                <FaPaperPlane />
              </InputRightElement>
              <Input placeholder='Type here...' value={comment} name="comment" onChange={(e) => setComment(e.target.value)} onKeyDown={handleKey} autoComplete="off" />
            </InputGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Stack>

  )
}