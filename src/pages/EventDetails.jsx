import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

const EventDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { event } = state || {};

  if (!event) {
    return (
      <Box p={4}>
        <Heading as="h2" size="lg">Event not found</Heading>
        <Button mt={4} onClick={() => navigate("/")}>Back to Events</Button>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <VStack spacing={4} align="start">
        <Heading as="h2" size="lg">{event.title}</Heading>
        <Text fontSize="md"><strong>Date:</strong> {event.date}</Text>
        <Text fontSize="md"><strong>Description:</strong> {event.description}</Text>
        <Button mt={4} onClick={() => navigate("/")}>Back to Events</Button>
      </VStack>
    </Box>
  );
};

export default EventDetails;