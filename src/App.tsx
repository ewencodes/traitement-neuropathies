import { Button, Divider, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { WarningIcon } from '@chakra-ui/icons'

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
    return <Session duration={25} end={endSession} />
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
          <Text>Température de l'eau froide : <strong>14° à 18°</strong></Text>
          <Text>Ne pas appliquer de glaçons.</Text>
        </Flex>
        <Divider />
        <Text backgroundColor="red" color="white" px={4} py={2} borderRadius="md" display="flex" alignItems="center" gap={4}><WarningIcon /> Pensez à désactiver la mise en veille automatique de votre téléphone dans les réglages.</Text>
        <Divider />
        <Text>Durée : <strong>25 minutes</strong></Text>
        <Button colorScheme="blue" onClick={startSession}>Commencer</Button>
      </Flex>
    </Flex>
  )
}

export default App
