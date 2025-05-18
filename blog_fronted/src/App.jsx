import { useEffect, useState } from 'react';
import { HStack, Text, Input, Icon, IconButton, Menu, MenuItem, MenuButton, MenuList, Button } from '@chakra-ui/react';
import { FaEdit, FaLock, FaSignInAlt, FaUser, FaUserCircle } from 'react-icons/fa';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { useBlog } from "./context/blogcontext.jsx";
import './App.css';

function App() {
  const { search, setSearch } = useBlog();
  const [isExist, setIsExist] = useState(false);
  const location = useLocation()
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
  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  }

  // write a post
  const handlePost = () => {
    if (user) {
      navigate('/blog-post', { replace: true })
    } else {
      toast("Login First");
    }
  }

  return (
    <>
      {/* navbar */}
      <HStack w="100%" justify="space-between" px={{ base: "4", md: "0" }}>
        {/* Left Side */}
        <HStack align="start" spacing="3">
          <Text fontSize="2xl" fontWeight="bold">Blog</Text>
          {!['/dashboard', '/profile', '/logout', '/login', '/register'].includes(location.pathname) && (
            <Input
              placeholder="Search for category"
              value={search}
              size="sm"
              rounded="full"
              onChange={handleChange}
            />
          )}
        </HStack>

        {/* Right Side */}
        <HStack align="end" spacing="4">
          {!['/login', '/register', '/logout'].includes(location.pathname) && (
            <IconButton
              aria-label="Write Post"
              icon={<FaEdit />}
              title="Write a Post"
              onClick={handlePost}
            />
          )
          }
          {isExist ? (
            <Menu>
              <MenuButton as={Button} rightIcon={<FaUserCircle />}>
                {/* You can put username here if needed */}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate('/dashboard')}>
                  <Icon as={FaUser} mr={2} /> Dashboard
                </MenuItem>
                <MenuItem onClick={() => navigate('/profile')}>
                  <Icon as={FaUserCircle} mr={2} /> Edit Profile
                </MenuItem>
                <MenuItem onClick={() => navigate('/change-password')}>
                  <Icon as={FaLock} mr={2} /> Change Password
                </MenuItem>
                <MenuItem color="red.500" onClick={() => navigate('/logout', { replace: true })}>
                  <Icon as={FaSignInAlt} mr={2} /> Sign Out
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            !['/login', '/register'].includes(location.pathname) && (
              <Button colorScheme="teal" onClick={() => navigate('/login')}>
                Login
              </Button>
            )
          )}
        </HStack>
      </HStack>
      <Outlet />
      <Toaster />
    </>
  )
}

export default App
