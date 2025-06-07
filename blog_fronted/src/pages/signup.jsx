import { useState } from 'react';
import { Box, FormControl, Input, Text, InputGroup,InputLeftElement, InputRightElement, Button, Link } from '@chakra-ui/react';
import { FaEyeSlash, FaEye, FaEnvelope, FaKey } from 'react-icons/fa';
import toast from 'react-hot-toast';
import axios from 'axios';

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", role: "" })
  const [hide, setHide] = useState(false)

  // insert details
  const handlechange = (e) => {
    console.log(e.target.value)
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
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

  // submit the record
  const handleSubmit = async (e) => {
    e.preventDefault();
    const serverUrl = import.meta.env.VITE_SERVER_URL;
    const { name, email, password } = user;

    if (!name || !email || !password) { // if some record not fill then display the message
      return toast.error("Fill all required fields.");
    }

    try {
      const res = await axios.post(`${serverUrl}/api/auth/register`, user);

      if (res.data.success === false) {
        toast.error(res.data.msg);
      } else {
        toast.success(res.data.msg)
        const user_info = {
          id: res.data.id,
          name: res.data.name
        }

        localStorage.setItem("user", JSON.stringify(user_info))

        localStorage.setItem("user", JSON.stringify(user_info));
        navigate("/login", { replace: true })

      }
    } catch (error) {
      toast.error(error.response.data.msg)
    }
  }
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mt="10">
      <Text fontStyle="italic" fontSize="2xl" fontFamily="cursive" >Create an Account </Text>
      <Box width={['90%', '70%', '30%']} bg="slate.500" color="black" border="2px solid" borderColor="blue.400" borderRadius="lg" boxShadow="md" textAlign="center">
        <form onSubmit={handleSubmit}>
          <FormControl p="8">
            <Input name='name' placeholder='Name' my="4" onChange={handlechange} />
            <InputGroup my="4" >
              <InputLeftElement cursor="pointer">
                <FaEnvelope />
              </InputLeftElement>
              <Input type='email' name='email' id="email" placeholder='Email' onChange={handlechange} />
            </InputGroup>

            <InputGroup my="4">
            <InputLeftElement>
              <FaKey/>
            </InputLeftElement>
              <InputRightElement cursor="pointer" onClick={() => toggle('pass')}>
                {
                  hide?.pass ? <FaEye /> : <FaEyeSlash />
                }
              </InputRightElement>
              <Input type={hide.pass ? 'text' : 'password'} name='password' id="password" placeholder='Password' onChange={handlechange} />
            </InputGroup>

          </FormControl>
          <Button //submit button
            m="4"
            colorScheme='teal'
            type='submit' >
            Sign Up
          </Button>
        </form>
      </Box>
      <Text mt="8">Already have an account ? <Link href='/login'>Sign in here</Link></Text>
    </Box>
  )
};

export default Register;
