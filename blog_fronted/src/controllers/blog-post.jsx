import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Spinner, Text, Tag, TagCloseButton, TagLabel, Textarea, Image, Wrap, WrapItem, useDisclosure, Modal, ModalContent, ModalBody, ModalFooter, ModalOverlay, HStack, ModalCloseButton, ModalHeader } from '@chakra-ui/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { toast } from "react-hot-toast";
import uploadFile from '../helpers/uploadBlogImage.js';

export default function BlogPost() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Loading, setLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const [user, setUser] = useState(null);

  const saveIntervalRef = useRef(null); // for 30s interval

  // stored user detail from localstorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  // for 30sec interval saving the post as draft
  useEffect(() => {
    saveIntervalRef.current = setInterval(() => {
      handleDraft();
    }, 5000); // 5 seconds

    return () => clearInterval(saveIntervalRef.current);
  }, []);

  // upload image in cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const uploadPhoto = await uploadFile(file)
      console.log(uploadPhoto)
      setImage(uploadPhoto?.url)
    };
  };

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

  // save blog as draft
  const handleDraft = async () => {
   
    const draftBlog = {
      image, title, content, tags, status: "draft", id: user?.id
    }
   
    try {
      setDraftLoading(true);
      const url = import.meta.env.VITE_SERVER_URL;
      const res = await axios.post(`${url}/api/blogs/save-draft`, draftBlog);
      if (res.data.success) {
        toast.success("Saved as draft");
        setImage(null)
        setContent("");
        setTags([]);
        setTitle("");
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to publish blog. Please try again.");
    } finally {
      setDraftLoading(false)
    }
  }

  const handleChange = (e)=>{
    const {name,value} = e.target;
    if(name === 'title'){
      setTitle(value);
    }else if(name === "content"){
      setContent(value);
    }else if(name === 'tags'){
      setTags(value);
    }
   
    if (timeoutId) clearTimeout(timeoutId);

    const id = setTimeout(() => {
      handleDraft();
    }, 30000);

    setTimeoutId(id);
  }

  // open preview section
  const handlePreview = () => {
    onOpen();
  };

  // publish the blog
  const pubishBlog = async () => {
    const postBlog = {
      image, title, content, tags, status: "published", id: user?.id
    }
    console.log(postBlog)
    try {
      setLoading(true);
      const url = import.meta.env.VITE_SERVER_URL;

      const res = await axios.post(`${url}/api/blogs/publish`, postBlog);
      console.log(res)
      if (res.data.success) {
        toast.success("Post added");
        setContent("");
        setTags([]);
        setTitle("");
        onClose();
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to publish blog. Please try again.");
    } finally {
      setLoading(false)
    }
  }
  return (
    <Flex justify="center" align="start" p={6}>
      <Box
        as={motion.div}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        w={{ base: '100%', md: '60%' }}
        bg="white"
        p={8}
        rounded="lg"
        shadow="lg"
      >
        <Heading mb={6}>Publish a New Blog</Heading>

        <FormControl mb={4}>
          <FormLabel>Upload Cover Image</FormLabel>
          <Input type="file" onChange={handleImageUpload} />
          {image && (
            <Image mt={4} src={image} alt="Preview" borderRadius="md" boxSize="200px" objectFit="cover" />
          )}
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Title</FormLabel>
          <Input
            placeholder="Enter blog title"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Content</FormLabel>
          <Textarea
            placeholder="Write your content here..."
            name="content"
            value={content}
            onChange={handleChange}
            rows={6}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Tags</FormLabel>
          <Input
            placeholder="Enter a tag and press Enter"
            name="tags"
            value={tagInput}
            onChange={handleChange}
            onKeyDown={handleAddTag}
          />
          <Wrap mt={2}>
            {tags.map((tag) => (
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
        </FormControl>
        <HStack alignItems="center" justify="center">
          <Button
            colorScheme="teal"
            size="lg"
            mt={6}
            disabled={draftLoading}
            leftIcon={draftLoading && <Spinner size="md" />}
            onClick={handleDraft}
          >
            {draftLoading ? "Saving" : "Save as Draft"}
          </Button>
          <Button
            colorScheme="teal"
            size="lg"
            mt={6}
            onClick={handlePreview}
          >
            Publish
          </Button>
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} >
        <ModalOverlay />
        <ModalContent p={4} maxW="350px" margin="auto">
          <ModalCloseButton />
          <ModalHeader align="center" bg="gray.200" mt="8" rounded="full">Preview It</ModalHeader>
          <ModalBody>
            <Flex justify="center" align="center" direction="column">
              <Image src={image} alt="blog_image" />
              <Text alignContent="center" mt="4" fontSize="xl" fontWeight="semibold">Title : {title}</Text>
              <Wrap mt={4}>
                {tags.map((tag) => (
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
              <Text mt="8" fontSize="lg" fontWeight="semibold">{content}</Text>
            </Flex>
            <HStack justify="space-between" align="center" mt="8" >
              <Button colorScheme='teal' onClick={() => onClose()}>
                Back
              </Button>
              <Button colorScheme='teal'
                disabled={Loading}
                leftIcon={Loading && <Spinner size="md" />}
                type='submit'
                onClick={() => pubishBlog()} >
                {Loading ? "Publishing" : "Publish Now"}</Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
