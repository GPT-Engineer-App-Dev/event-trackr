import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Heading, VStack } from '@chakra-ui/react';
import { SupabaseAuthUI, useSupabaseAuth } from '../integrations/supabase/auth.jsx';

const Login = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  return (
    <Container maxW="container.sm" p={4}>
      <VStack spacing={8}>
        <Box as="header" w="100%" bg="blue.500" color="white" p={4} borderRadius="md">
          <Heading as="h1" size="lg">Admin Login</Heading>
        </Box>
        <Box as="section" w="100%">
          <SupabaseAuthUI />
        </Box>
      </VStack>
    </Container>
  );
};

export default Login;