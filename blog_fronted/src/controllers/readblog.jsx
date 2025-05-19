import { Heading, Image, Stack, Text, Box, Flex, Wrap, WrapItem, Tag, TagLabel } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom"
import moment from "moment"
export default function ReadBlog() {
  const { id } = useParams();

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
    staleTime: 1000
  })

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
        <Text fontWeight="medium">{data?.user?.rows[0]?.name}</Text>
        <Text>Published on: {moment(data?.blog.rows[0]?.updated_at).format("DD-MM-YYYY")}</Text>
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
      {/* Content */}

      <Heading size="md" mb={2} float="left">{data?.blog?.rows[0].title}</Heading>
      <Text float="left">
        {data?.blog?.rows[0].content}
      </Text>

    </Stack>

  )
}