import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router-dom';
import { BlogProvider } from './context/blogcontext.jsx';
import { SocketProvider } from './context/socket.jsx';
import router from './routes/route.jsx'
import './index.css'

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <BlogProvider>
          <SocketProvider>
            <RouterProvider router={router} />
          </SocketProvider>
        </BlogProvider>
      </ChakraProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </StrictMode>,
)
