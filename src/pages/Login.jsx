import { Box, Heading, VStack } from "@chakra-ui/react";
import { SupabaseAuthUI } from "../integrations/supabase/auth.jsx";

const Login = () => (
  <Box p={4}>
    <VStack spacing={4} align="start">
      <Heading as="h2" size="lg">Admin Login</Heading>
      <SupabaseAuthUI />
    </VStack>
  </Box>
);

export default Login;