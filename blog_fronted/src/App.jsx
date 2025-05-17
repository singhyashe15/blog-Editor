import { useEffect, useState } from 'react';
import { HStack, Text, Input, Icon, IconButton, Menu, MenuItem, MenuButton, MenuList, Button } from '@chakra-ui/react';
import { FaEdit, FaUserCircle } from 'react-icons/fa';
import { Outlet, useNavigate } from 'react-router-dom';
import { Toaster,toast } from 'react-hot-toast';
import { useBlog } from "./context/blogcontext.jsx";
import './App.css'

function App() {
  const { search,setSearch } = useBlog();
  const [isExist, setIsExist] = useState(false);
  const navigate = useNavigate()
  let user = null;

  // get the user details
  useEffect(() => {
    user = JSON.parse(localStorage.getItem("users"));
    if (user) {
      setIsExist(true)
    }
  }, []);

  //search by category 
  const handleChange = (e) =>{
    const {value} = e.target;
    setSearch(value);
  }

  // write a post
  const handlePost = () => {
    if (!user) {
      navigate('/blog-post', { replace: true })
    } else {
      toast("Login First");
    }
  }

  return (
    <>
    {/* navbar */}
      <HStack w="100%" justify="space-between" px={{base:"4" , md:"0"}}  >
        {/* Left Side */}
        <HStack align="start" spacing="3">
          <Text fontSize="2xl" fontWeight="bold">Blog</Text>
          <Input placeholder="Search for category" value={search} size="sm" rounded="full" onChange={handleChange} />
        </HStack>

        {/* Right Side */}
        <HStack align="end" spacing="4">
          <IconButton aria-label="Search" onClick={() => handlePost()} title="Write a Post">
            <Icon as={FaEdit} alt="write" />
          </IconButton>

          {!isExist ? (
            <Menu>
              <MenuButton as={Button} rightIcon={<FaUserCircle />}>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate('/profile')}>Dashboard</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem color="red.500" onClick={() => navigate('/logout', { replace: true })}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button m="4" colorScheme="teal">
              LoginIn
            </Button>
          )}
        </HStack>
      </HStack>
      <Outlet />
      <Toaster />
    </>
  )
}

export default App
