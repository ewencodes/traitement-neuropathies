import { Box, Center, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useMemo } from 'react'

export type StageType = {
    start: number,
    end: number,
    type: "cold" | "hot" | "change"
    to?: "cold" | "hot" | "start"
}

function setAsyncTimeout<T>(fn: () => Promise<T>, timeout = 0) {
    return new Promise<T>(resolve => {
        setTimeout(() => {
            const t = fn();
            resolve(t);
        }, timeout);
    });
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
        const playAudio = async () => {
            if (stage.type === "change") {
                const audio = new Audio('beep.mp3')

                await audio.play()
                audio.currentTime = 0

                if (`${stage.seconds}` === "1") {
                    setAsyncTimeout<void>(async () => {
                        const audio1 = new Audio("beep_start.mp3")

                        await audio1.play()
                        audio1.currentTime = 0
                    }, 1000)
                }
            }
        }

        playAudio()
    }, [stage, time])

    useEffect(() => {
        console.log(stage.to)
    }, [stage])

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
                            {(stage.to === "hot" || stage.to === "start") && <>Mettez vos pieds dans le bassin d'<strong>eau chaude</strong>.</>}
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