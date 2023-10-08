import React, { useEffect, useState } from 'react'
import { Button, Flex } from '@chakra-ui/react'
import Timer from './Timer'
import Stages, { StageType } from './Stages'

const Session: React.FC<{ end: () => void }> = ({ end }) => {
    const [time, setTime] = useState(680)
    const [isPaused, setIsPaused] = useState(false)
    const [isFinished, setIsFinished] = useState(false)

    const stages: StageType[] = [
        { start: 0, end: 5, type: "change", to: "start" },
        { start: 5, end: 305, type: "hot" },
        { start: 305, end: 310, type: "change", to: "cold" },
        { start: 310, end: 370, type: "cold" },
        { start: 370, end: 375, type: "change", to: "hot" },
        { start: 375, end: 615, type: "hot" },
        { start: 615, end: 620, type: "change", to: "cold" },
        { start: 620, end: 680, type: "cold" },
        { start: 680, end: 685, type: "change", to: "hot" },
        { start: 685, end: 925, type: "hot" },
        { start: 925, end: 930, type: "change", to: "cold" },
        { start: 930, end: 990, type: "cold" },
        { start: 990, end: 995, type: "change", to: "hot" },
        { start: 995, end: 1235, type: "hot" },
        { start: 1235, end: 1240, type: "change", to: "cold" },
        { start: 1240, end: 1540, type: "cold" },
    ]

    useEffect(() => {
        let interval: number | undefined;

        if (!isPaused) {
            interval = setInterval(() => {
                setTime(time => {
                    if (time >= 25 * 60 + 35) {
                        clearInterval(interval);
                        setIsFinished(true)
                        return time;
                    }

                    return time + 1;
                })
            }, 100)
        } else {
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [isPaused])

    return (
        <Flex px={4} direction="column" height="calc(100svh - 16px)">
            {isFinished ? (
                <h1>Terminé</h1>
            ) : (
                <>
                    <Timer time={time} />
                    <Stages stages={stages} time={time} stop={() => setIsPaused(true)} start={() => setIsPaused(false)} />
                    <Flex gap={4}>
                        <Button flex={1} colorScheme='red' onClick={end}>Terminer</Button>
                        {isPaused ? <Button flex={1} colorScheme='green' onClick={() => setIsPaused(false)}>Démarrer</Button> : <Button flex={1} colorScheme='orange' onClick={() => setIsPaused(true)}>Stop</Button>}
                    </Flex>
                </>
            )}
        </Flex>
    )
}

export default Session