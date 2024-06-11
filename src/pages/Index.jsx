import { Box, Container, Heading, VStack, Text, Flex, Spacer, Button, HStack } from "@chakra-ui/react";

const events = [
  { id: 1, title: "Event One", date: "2023-10-01", description: "Description for event one." },
  { id: 2, title: "Event Two", date: "2023-10-05", description: "Description for event two." },
  { id: 3, title: "Event Three", date: "2023-10-10", description: "Description for event three." },
];

const Index = () => {
  return (
    <Container maxW="container.xl" p={4}>
      <VStack spacing={8}>
        {/* Header */}
        <Box as="header" w="100%" bg="blue.500" color="white" p={4} borderRadius="md">
          <Flex align="center">
            <Heading as="h1" size="lg">Events Management</Heading>
            <Spacer />
            <Button colorScheme="teal" variant="outline">Login</Button>
          </Flex>
        </Box>

        {/* Events List */}
        <Box as="section" w="100%">
          <Heading as="h2" size="md" mb={4}>Upcoming Events</Heading>
          <VStack spacing={4}>
            {events.map(event => (
              <Box key={event.id} p={4} borderWidth="1px" borderRadius="md" w="100%">
                <HStack justify="space-between">
                  <Heading as="h3" size="sm">{event.title}</Heading>
                  <Text>{event.date}</Text>
                </HStack>
                <Text mt={2}>{event.description}</Text>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* Footer */}
        <Box as="footer" w="100%" bg="gray.200" p={4} borderRadius="md" textAlign="center">
          <Text>&copy; 2023 Events Management. All rights reserved.</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;