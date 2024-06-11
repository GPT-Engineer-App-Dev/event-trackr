import { useState } from "react";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { Box, Container, Heading, VStack, Text, Flex, Spacer, Button, HStack, Input, Textarea, FormControl, FormLabel } from "@chakra-ui/react";
import { useJobs, useAddJob, useUpdateJob, useDeleteJob } from "../integrations/supabase/index.js";

const Jobs = () => {
  const { data: jobs, isLoading, isError } = useJobs();
  const addJob = useAddJob();
  const updateJob = useUpdateJob();
  const deleteJob = useDeleteJob();
  const [newJob, setNewJob] = useState({ jobs_title: "", job_type: "", job_area: "" });
  const [editingJob, setEditingJob] = useState(null);
  const { session, logout } = useSupabaseAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingJob) {
      await updateJob.mutateAsync({ ...editingJob, ...newJob });
      setEditingJob(null);
    } else {
      await addJob.mutateAsync(newJob);
    }
    setNewJob({ jobs_title: "", job_type: "", job_area: "" });
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setNewJob({ jobs_title: job.jobs_title, job_type: job.job_type, job_area: job.job_area });
  };

  const handleDelete = async (id) => {
    await deleteJob.mutateAsync(id);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading jobs</div>;
  }

  return (
    <Container maxW="container.xl" p={4}>
      <VStack spacing={8}>
        {/* Header */}
        <Box as="header" w="100%" bg="blue.500" color="white" p={4} borderRadius="md">
          <Flex align="center">
            <Heading as="h1" size="lg">Jobs Management</Heading>
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
              <Heading as="h2" size="md" mb={4}>{editingJob ? "Edit Job" : "Create New Job"}</Heading>
              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <FormControl id="jobs_title" isRequired>
                    <FormLabel>Job Title</FormLabel>
                    <Input name="jobs_title" value={newJob.jobs_title} onChange={handleChange} />
                  </FormControl>
                  <FormControl id="job_type" isRequired>
                    <FormLabel>Job Type</FormLabel>
                    <Input name="job_type" value={newJob.job_type} onChange={handleChange} />
                  </FormControl>
                  <FormControl id="job_area" isRequired>
                    <FormLabel>Job Area</FormLabel>
                    <Textarea name="job_area" value={newJob.job_area} onChange={handleChange} />
                  </FormControl>
                  <Button type="submit" colorScheme="teal">{editingJob ? "Update Job" : "Add Job"}</Button>
                </VStack>
              </form>
            </Box>

            <Box as="section" w="100%">
              <Heading as="h2" size="md" mb={4}>Available Jobs</Heading>
              <VStack spacing={4}>
                {jobs.map(job => (
                  <Box key={job.id} p={4} borderWidth="1px" borderRadius="md" w="100%">
                    <HStack justify="space-between">
                      <Heading as="h3" size="sm">{job.jobs_title}</Heading>
                      <Text>{job.job_type}</Text>
                      <Button size="sm" onClick={() => handleEdit(job)}>Edit</Button>
                      <Button size="sm" colorScheme="red" onClick={() => handleDelete(job.id)}>Delete</Button>
                    </HStack>
                    <Text mt={2}>{job.job_area}</Text>
                  </Box>
                ))}
              </VStack>
            </Box>
          </>
        )}

        {/* Footer */}
        <Box as="footer" w="100%" bg="gray.200" p={4} borderRadius="md" textAlign="center">
          <Text>&copy; 2023 Jobs Management. All rights reserved.</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Jobs;