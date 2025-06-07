import { useState } from 'react';
import { Box, Text, FormControl, InputGroup, Input, InputLeftElement, InputRightElement, Spinner, Button, Link } from "@chakra-ui/react";
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaEnvelope, FaKey } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState(null);
  const [hide, setHide] = useState(false)
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // insert into user state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  // toggle seen password
  const toggle = (field) => {
    setHide((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // proceed to login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    
    if (!email || !password) {
      return toast.error("Fill all required fields.");
    }
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      setLoading(true);
      const res = await axios.post(`${url}/api/auth/login`, user);
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem('user',JSON.stringify(res.data.data)) //setting user_info
        navigate('/', { replace: true }) //navigating to home
      }

    } catch (error) {
      toast.error(error.response.data.msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mt="8">
      <Text fontStyle="italic" fontSize="2xl" fontFamily="cursive" >Welcome Back</Text>
      <Box width={['90%', '70%', '30%']} bg="slate.500" color="black" border="2px solid" borderColor="blue.400" borderRadius="lg" boxShadow="md" textAlign="center" mt="8">
        <form onSubmit={handleSubmit}>
          <FormControl p="8">
            <InputGroup>
              <InputLeftElement>
                <FaEnvelope />
              </InputLeftElement>
              <Input placeholder="Enter registered Email" name="email" onChange={handleChange} />
            </InputGroup>
            <InputGroup my="4">
              <InputLeftElement>
                <FaKey />
              </InputLeftElement>
              <InputRightElement cursor="pointer" onClick={() => toggle('pass')}>
                {
                  hide?.pass ? <FaEye /> : <FaEyeSlash />
                }
              </InputRightElement>
              <Input type={hide.pass ? 'text' : 'password'} name='password' id="password" placeholder='Password' onChange={handleChange} />
            </InputGroup>

          </FormControl>
          <Button
            m="4"
            colorScheme='teal'
            disabled={Loading}
            leftIcon={Loading && <Spinner size="md" />}
            type='submit'
            onClick={handleSubmit} >
            {Loading ? "Verifying" : "Sign In"}
          </Button>
        </form>
      </Box>
      <Text mt="8">Don't have an account ? <Link href='/register' >Join us today</Link></Text>
    </Box>
  )
}