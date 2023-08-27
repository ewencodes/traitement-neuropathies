import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

export type StageType = {
    start: number,
    end: number,
    type: "cold" | "hot"
}

const Stages: React.FC<{ stages: StageType[], time: number }> = ({ stages, time }) => {
    const [stageTime, setStageTime] = useState(0)
    const [stage, setStage] = useState<StageType | null>(null)

    useEffect(() => {
        const currentStage = stages.find(stage => stage.start <= time && stage.end > time);

        if (!currentStage) {
            setStage(null);
            return;
        }

        if (!stage && currentStage || (stage?.start !== currentStage.start && stage?.start !== currentStage.end)) {
            setStage(currentStage)
        }

        if (stage) {
            setStageTime(Math.abs(time - stage.end));
        }
    }, [time])

    return (
        <Flex direction="column" justifyContent="center" flex={1}>
            <Box rounded="2xl" bg={stage?.type === "hot" ? "red.100" : "blue.100"} py={4}>
                <Text textAlign="center">Temps restant</Text>
                <Text textAlign="center" fontSize="6xl">{("0" + Math.floor((stageTime / 6000) % 60)).slice(-2)}:{("0" + (Math.floor((stageTime / 100) % 60))).slice(-2)}</Text>
                <Text textAlign="center" fontSize="5xl">{stage?.type === "hot" ? "Eau chaude" : "Eau froide"}</Text>
            </Box>
        </Flex>
    )
}

export default Stages