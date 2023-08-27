import { Button, Divider, Flex, Heading, Text } from '@chakra-ui/react'
import { useState } from 'react'
import Session from './components/Session';

const App = () => {
  const [sessionIsStarted, setSessionIsStarted] = useState(false);

  const startSession = () => {
    setSessionIsStarted(true)
  }

  const endSession = () => {
    setSessionIsStarted(false);
  }

  if (sessionIsStarted) {
    return <Session duration={25} end={endSession} start={startSession} />
  }

  return (
    <Flex direction="column" p={4}>
      <Flex direction="column" gap={4}>
        <Flex direction="column" gap={1}>
          <Heading fontWeight="bold">Traitement neuropathies</Heading>
          <Text>Chronomètre pour bain eau froide et chaude</Text>
        </Flex>
        <Divider />
        <Flex direction="column">
          <Text fontWeight="bold">Instructions</Text>
          <Text>Température de l'eau chaude : <strong>38° à 43°</strong></Text>
          <Text>Température de l'eau froid : <strong>14° à 18°</strong></Text>
          <Text>Ne pas appliquer de glaçons.</Text>
        </Flex>
        <Divider />
        <Text>Durée : <strong>25 minutes</strong></Text>
        <Button colorScheme="blue" onClick={startSession}>Commencer</Button>
      </Flex>
    </Flex>
  )
}

export default App
