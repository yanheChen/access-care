import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  ChakraProvider,
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Select,
  Input,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
  List,
  ListItem,
  useColorModeValue
} from '@chakra-ui/react';
import { InfoIcon, SearchIcon, StarIcon } from '@chakra-ui/icons';

// Main Healthcare Portal Component
const HealthcarePortal = () => {
  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia'
  ];

  const healthcarePolicies = {
    California: {
      generalInfo: "California provides comprehensive healthcare coverage through various programs including Medi-Cal and Covered California.",
      keyPrograms: [
        "Medi-Cal: State Medicaid program for eligible low-income individuals",
        "Covered California: State health insurance marketplace",
        "Family PACT: Family planning services"
      ],
      estimatedCosts: {
        primaryCare: "$100-200",
        specialists: "$150-300",
        emergency: "$100-1000"
      }
    }
  };

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={6} align="stretch">
        {/* Header Section */}
        <Card bg={bgColor} borderWidth="1px" borderColor={borderColor}>
          <CardHeader>
            <Heading size="lg">Healthcare Policy Information Portal</Heading>
          </CardHeader>
          <CardBody>
            <HStack spacing={4}>
              <Select placeholder="Select your state" maxW="200px">
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </Select>
              <Input placeholder="Search healthcare information..." />
              <Button colorScheme="blue">Search</Button>
            </HStack>
          </CardBody>
        </Card>

        {/* Main Content Tabs */}
        <Tabs variant="enclosed" colorScheme="blue">
          <TabList>
            <Tab><HStack><InfoIcon /><Text>State Policies</Text></HStack></Tab>
            <Tab><HStack><SearchIcon /><Text>Cost Information</Text></HStack></Tab>
            <Tab><HStack><StarIcon /><Text>Support Resources</Text></HStack></Tab>
          </TabList>

          <TabPanels>
            {/* State Policies Panel */}
            <TabPanel>
              <Card>
                <CardHeader>
                  <Heading size="md">Healthcare Policies</Heading>
                </CardHeader>
                <CardBody>
                  <VStack align="stretch" spacing={4}>
                    <Text>
                      Please select a state to view healthcare policies.
                    </Text>
                    <Box>
                      <Heading size="sm" mb={2}>Key Programs:</Heading>
                      <List spacing={2}>
                        {healthcarePolicies.California.keyPrograms.map((program, index) => (
                          <ListItem key={index}>{program}</ListItem>
                        ))}
                      </List>
                    </Box>
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>

            {/* Cost Information Panel */}
            <TabPanel>
              <Card>
                <CardHeader>
                  <Heading size="md">Healthcare Costs</Heading>
                </CardHeader>
                <CardBody>
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                    <Card p={4}>
                      <Heading size="sm">Primary Care Visit</Heading>
                      <Text mt={2}>{healthcarePolicies.California.estimatedCosts.primaryCare}</Text>
                    </Card>
                    <Card p={4}>
                      <Heading size="sm">Specialist Visit</Heading>
                      <Text mt={2}>{healthcarePolicies.California.estimatedCosts.specialists}</Text>
                    </Card>
                    <Card p={4}>
                      <Heading size="sm">Emergency Care</Heading>
                      <Text mt={2}>{healthcarePolicies.California.estimatedCosts.emergency}</Text>
                    </Card>
                  </SimpleGrid>
                </CardBody>
              </Card>
            </TabPanel>

            {/* Support Resources Panel */}
            <TabPanel>
              <Card>
                <CardHeader>
                  <Heading size="md">Support Resources</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={4} align="stretch">
                    <Card p={4}>
                      <Heading size="sm">State Health Department</Heading>
                      <Text mt={2}>Contact: 1-800-XXX-XXXX</Text>
                      <Text>Website: www.statehealth.gov</Text>
                    </Card>
                    <Card p={4}>
                      <Heading size="sm">Healthcare Navigator Program</Heading>
                      <Text mt={2}>Free assistance with understanding healthcare options</Text>
                      <Text>Contact: 1-800-XXX-XXXX</Text>
                    </Card>
                  </VStack>
                </CardBody>
              </Card>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
};

// App Component with Router Configuration
const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HealthcarePortal />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

// Root rendering
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;