import { useState } from "react";
import { useSupabaseAuth, SupabaseAuthUI } from "../integrations/supabase/auth.jsx";
import { useNavigate } from "react-router-dom";
import { Box, Container, Heading, VStack, Text, Flex, Spacer, Button, HStack, Input, Textarea, FormControl, FormLabel } from "@chakra-ui/react";
import { useEvents, useAddEvent, useUpdateEvent, useDeleteEvent } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: events, isLoading, isError } = useEvents();
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const deleteEvent = useDeleteEvent();
  const [newEvent, setNewEvent] = useState({ title: "", date: "", description: "" });
  const [editingEvent, setEditingEvent] = useState(null);
  const { session, logout } = useSupabaseAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingEvent) {
      await updateEvent.mutateAsync({ ...editingEvent, ...newEvent });
      setEditingEvent(null);
    } else {
      await addEvent.mutateAsync(newEvent);
    }
    setNewEvent({ title: "", date: "", description: "" });
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setNewEvent({ title: event.title, date: event.date, description: event.description });
  };

  const handleDelete = async (id) => {
    await deleteEvent.mutateAsync(id);
  };

  const handleViewDetails = (event) => {
    navigate(`/event/${event.id}`, { state: { event } });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading events</div>;
  }

  return (
    <Container maxW="container.xl" p={4}>
      <VStack spacing={8}>
        {/* Header */}
        <Box as="header" w="100%" bg="blue.500" color="white" p={4} borderRadius="md">
          <Flex align="center">
            <Heading as="h1" size="lg">Events Management</Heading>
            <Spacer />
            {session ? (
              <Button colorScheme="teal" variant="outline" onClick={logout}>Logout</Button>
            ) : (
              <Button colorScheme="teal" variant="outline" onClick={() => navigate("/login")}>Login</Button>
            )}
          </Flex>
        </Box>

        {session && (
          <>
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

            <Box as="section" w="100%">
              <Heading as="h2" size="md" mb={4}>Upcoming Events</Heading>
              <VStack spacing={4}>
                {events.map(event => (
                  <Box key={event.id} p={4} borderWidth="1px" borderRadius="md" w="100%">
                    <HStack justify="space-between">
                      <Heading as="h3" size="sm" onClick={() => handleViewDetails(event)} cursor="pointer">{event.name}</Heading>
                      <Text>{event.date}</Text>
                      <Button size="sm" onClick={() => handleEdit(event)}>Edit</Button>
                      <Button size="sm" colorScheme="red" onClick={() => handleDelete(event.id)}>Delete</Button>
                    </HStack>
                    <Text mt={2}>{event.description}</Text>
                  </Box>
                ))}
              </VStack>
            </Box>
          </>
        )}

        {/* Footer */}
        <Box as="footer" w="100%" bg="gray.200" p={4} borderRadius="md" textAlign="center">
          <Text>&copy; 2023 Events Management. All rights reserved.</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;