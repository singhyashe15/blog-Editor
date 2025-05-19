import { Avatar, Button, Flex, VStack, Input, InputGroup, InputLeftElement, Textarea, Stack, useBreakpointValue, } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserCircle, FaEnvelope, FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Profile() {
  
  const [updateDetail, setUpdateDetail] = useState({ id:0,name: "", email: "", bio: "", youtube: "", instagram: "", facebook: "", twitter: "" });
  // Use Stack with direction controlled by breakpoint
  const stackDirection = useBreakpointValue({ base: "column", md: "row" });
  const inputWidth = useBreakpointValue({ base: "100%", md: "400px" });
  const textareaWidth = useBreakpointValue({ base: "100%", md: "800px" });
  const buttonWidth = useBreakpointValue({ base: "100%", md: "20%" });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUpdateDetail((prev) => ({
        ...prev,
        name: storedUser.name || "",
        id:storedUser.id || -1
      }));
    }
  }, []);

  // add link like youtube,instagram ,...
  const handleLink = (e) => {
    const { name, value } = e.target;
    setUpdateDetail((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  // add the bio 
  const handleBio = (e) => {
    const { name, value } = e.target;
    console.log(name + " " + value)
    setUpdateDetail((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  // handle the update details logic 
  const handleupdate = async (e) => {
    // e.preventDefault();
    
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const updatedres = await axios.post(`${url}/api/auth/update-details`, updateDetail);
      if(updatedres.data.success){
        toast.success(updatedres.data.msg)
      }
    } catch (error) {
      console.log(error)
      toast.error("Not updated");
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
              placeholder={updateDetail?.name || "Name"}
              variant="filled"
            />
          </InputGroup>

          <InputGroup maxW={inputWidth}>
            <InputLeftElement pointerEvents="none" color="gray.500" children={<FaEnvelope />} />
            <Input
              type="email"
              name="email"
              id="email"
              placeholder={updateDetail?.email || "Email"}
              variant="filled"
            />
          </InputGroup>
        </Stack>

        <Textarea
          placeholder="Enter a Bio"
          name="bio"
          w={textareaWidth}
          resize="vertical"
          minH="100px"
          variant="filled"
          onChange={handleBio}
        />
        <Button w={buttonWidth} alignSelf={{ base: "stretch", md: "flex-start" }} onClick={() => handleupdate()}>
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
