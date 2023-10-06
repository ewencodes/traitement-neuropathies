import { Box, Center, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useMemo } from 'react'

export type StageType = {
    start: number,
    end: number,
    type: "cold" | "hot" | "change"
    to?: "cold" | "hot" | "start"
}

const Stages: React.FC<{ stages: StageType[], time: number, start: () => void, stop: () => void }> = ({ stages, time }) => {
    const stage = useMemo(() => {
        const stage = stages.find(stage => stage.start <= time && stage.end > time);

        if (!stage) {
            return {
                minutes: "00",
                seconds: "00",
                type: stages[stages.length - 1].type
            }
        }

        if (stage.type === "change") {
            return {
                minutes: "",
                seconds: (Math.abs(time - stage?.end)) % 60,
                type: stage.type,
                to: stage.to
            };
        } else {
            return {
                minutes: ("0" + Math.floor((Math.abs((time - stage?.end) / 60)) % 60)).slice(-2),
                seconds: ("0" + (Math.abs(time - stage?.end)) % 60).slice(-2),
                type: stage.type
            };
        }
    }, [time])

    useEffect(() => {
        if (stage.type === "change") {
            new Audio('beep.mp3').play()

            if (`${stage.seconds}` === "1") {
                setTimeout(() => {
                    new Audio("beep_start.mp3").play()
                }, 1000)
            }
        }
    }, [stage, time])

    return (
        <Flex direction="column" justifyContent="center" flex={1}>
            {stage?.type === "change" ? (
                <Box rounded="2xl" py={4} bg="orange">
                    <Text fontSize="5xl" textTransform="uppercase" color="white" fontWeight="bold" textAlign="center">{stage.to === "start" ? "Début dans" : "Changement"}</Text>
                    <Flex py={5} alignItems="center" justifyContent="center">
                        <Center bg="white" w="24" h="24" rounded="full">
                            <Text textAlign="center" fontSize="6xl" fontWeight="bold">{stage?.seconds}</Text>
                        </Center>
                    </Flex>
                    {stage.to && (
                        <Text fontSize="4xl" color="white" textAlign="center">
                            {stage.to === "hot" || stage.to === "start" && <>Mettez vos pieds dans le bassin d'<strong>eau chaude</strong>.</>}
                            {stage.to === "cold" && <>Mettez vos pieds dans le bassin d'<strong>eau froide</strong>.</>}
                        </Text>
                    )}
                </Box>
            ) : (
                <Box rounded="2xl" bg={stage?.type === "hot" ? "red.100" : "blue.100"} py={4}>
                    <Text textAlign="center">Temps restant</Text>
                    <Text textAlign="center" fontSize="7xl" fontWeight="black">{stage?.minutes}:{stage?.seconds}</Text>
                    <Text textAlign="center" fontSize="5xl" fontWeight="medium">{stage?.type === "hot" ? "Eau chaude" : "Eau froide"}</Text>
                </Box>
            )}
        </Flex>
    )
}

export default Stages