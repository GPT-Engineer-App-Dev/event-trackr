import { useState } from "react";
import { Box, Container, Heading, VStack, Text, Flex, Spacer, Button, HStack, Input, Textarea, FormControl, FormLabel } from "@chakra-ui/react";

const initialEvents = [
  { id: 1, title: "Event One", date: "2023-10-01", description: "Description for event one." },
  { id: 2, title: "Event Two", date: "2023-10-05", description: "Description for event two." },
  { id: 3, title: "Event Three", date: "2023-10-10", description: "Description for event three." },
];

const Index = () => {
  const [events, setEvents] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", description: "" });
  const [editingEvent, setEditingEvent] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEvent) {
      setEvents(events.map(event => event.id === editingEvent.id ? { ...editingEvent, ...newEvent } : event));
      setEditingEvent(null);
    } else {
      const id = events.length ? events[events.length - 1].id + 1 : 1;
      setEvents([...events, { ...newEvent, id }]);
    }
    setNewEvent({ title: "", date: "", description: "" });
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setNewEvent({ title: event.title, date: event.date, description: event.description });
  };

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

        {/* Create/Edit Event Form */}
        <Box as="section" w="100%">
          <Heading as="h2" size="md" mb={4}>{editingEvent ? "Edit Event" : "Create New Event"}</Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input name="title" value={newEvent.title} onChange={handleChange} />
              </FormControl>
              <FormControl id="date" isRequired>
                <FormLabel>Date</FormLabel>
                <Input type="date" name="date" value={newEvent.date} onChange={handleChange} />
              </FormControl>
              <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea name="description" value={newEvent.description} onChange={handleChange} />
              </FormControl>
              <Button type="submit" colorScheme="teal">{editingEvent ? "Update Event" : "Add Event"}</Button>
            </VStack>
          </form>
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
                  <Button size="sm" onClick={() => handleEdit(event)}>Edit</Button>
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