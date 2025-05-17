import { Avatar, Button, Flex, VStack, Input, InputGroup, InputLeftElement, Textarea, Stack, useBreakpointValue, } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserCircle, FaEnvelope, FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [updateDetail, setUpdateDetail] = useState({ name: "", email: "", bio: "", youtube: "", instagram: "", facebook: "", twitter: "" });
  // Use Stack with direction controlled by breakpoint
  const stackDirection = useBreakpointValue({ base: "column", md: "row" });
  const inputWidth = useBreakpointValue({ base: "100%", md: "400px" });
  const textareaWidth = useBreakpointValue({ base: "100%", md: "800px" });
  const buttonWidth = useBreakpointValue({ base: "100%", md: "20%" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("users"));
    if (storedUser) {
      setUpdateDetail((prev) => ({
        ...prev,
        name: storedUser.name || "",
      }));
    }
  }, []);

  const handleLink = (e) => {
    const { name, value } = e.target;
    setUpdateDetail((prev) = {
      ...prev,
      [name]: value,
    })
  }

  const handleBio = (e) => {
    const { name, value } = e.target;
    setUpdateDetail((prev) = {
      ...prev,
      [name]: value,
    })
  }

  const handleupdate = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
      for (const key in formData) {
        payload.append(key, formData[key]);
      }
      const url = import.meta.env.VITE_SERVER_URL;
      const updatedres = await axios.post(`${url}/api/update-details`, payload);

    } catch (error) {

    }
  }
  return (
    <Stack spacing={10} direction={stackDirection} p={4} maxW="1000px" mx="auto">
      <VStack justify="center" align="center" spacing={4} flexShrink={0}>
        <Avatar size="lg" />
        <Button >Upload</Button>
      </VStack>

      <Flex direction="column" flex="1" gap={6} px={{base :"8" ,md:"0"}}>
        <Stack
          direction={stackDirection}
          spacing={6}
          justify="space-between"
          flexWrap="wrap"
        >
          <InputGroup maxW={inputWidth}>
            <InputLeftElement pointerEvents="none" color="gray.500" children={<FaUserCircle />} />
            <Input
              name="name"
              id="name"
              placeholder={user?.name || "Name"}
              variant="filled"
            />
          </InputGroup>

          <InputGroup maxW={inputWidth}>
            <InputLeftElement pointerEvents="none" color="gray.500" children={<FaEnvelope />} />
            <Input
              type="email"
              name="email"
              id="email"
              placeholder={user?.email || "Email"}
              variant="filled"
            />
          </InputGroup>
        </Stack>

        <Textarea
          placeholder="Enter a Bio"
          w={textareaWidth}
          resize="vertical"
          minH="100px"
          variant="filled"
          onChange={handleBio}
        />
        <Button w={buttonWidth} alignSelf={{ base: "stretch", md: "flex-start" }} onClick={() => handleupdate}>
          Add a Bio
        </Button>

        <Stack
          direction={stackDirection}
          spacing={6}
          flexWrap="wrap"
          justify="space-between"
        >
          <InputGroup maxW={inputWidth}>
            <InputLeftElement pointerEvents="none" color="gray.500" children={<FaYoutube />} />
            <Input
              name="youtube"
              id="youtube"
              placeholder="Add a YouTube account"
              variant="filled"
              onChange={handleLink}
            />
          </InputGroup>

          <InputGroup maxW={inputWidth}>
            <InputLeftElement pointerEvents="none" color="gray.500" children={<FaInstagram />} />
            <Input
              name="instagram"
              id="instagram"
              placeholder="Add an Instagram account"
              variant="filled"
              onChange={handleLink}
            />
          </InputGroup>
        </Stack>

        <Stack
          direction={stackDirection}
          spacing={6}
          flexWrap="wrap"
          justify="space-between"
        >
          <InputGroup maxW={inputWidth}>
            <InputLeftElement pointerEvents="none" color="gray.500" children={<FaFacebook />} />
            <Input
              name="facebook"
              id="facebook"
              placeholder="Add a Facebook account"
              variant="filled"
              onChange={handleLink}
            />
          </InputGroup>

          <InputGroup maxW={inputWidth}>
            <InputLeftElement pointerEvents="none" color="gray.500" children={<FaTwitter />} />
            <Input
              name="twitter"
              id="twitter"
              placeholder="Add a Twitter account"
              variant="filled"
              onChange={handleLink}
            />
          </InputGroup>
        </Stack>

        <Button w={buttonWidth} alignSelf={{ base: "stretch", md: "flex-start" }} onClick={() => handleupdate()}>
          Update
        </Button>
      </Flex>
    </Stack>
  );
}
