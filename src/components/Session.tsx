import React, { useEffect, useState } from 'react'
import { Button, Flex } from '@chakra-ui/react'
import Timer from './Timer'
import Stages, { StageType } from './Stages'

const Session: React.FC<{ duration: number, end: () => void }> = ({ duration, end }) => {
    const [time, setTime] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [stages, setStages] = useState<StageType[]>([]);

    useEffect(() => {
        let interval: number | undefined;

        if (!isPaused) {
            interval = setInterval(() => {
                setTime(time => {
                    if (time >= duration * 60 * 100) {
                        clearInterval(interval);
                        return time;
                    }

                    return time + 1;
                })
            }, 10)
        } else {
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [isPaused])

    useEffect(() => {
        if (stages.length > 0) return;

        const milliseconds = (duration * 60 * 100) - 60_000;

        setStages(stages => {
            stages.push({
                start: 0,
                end: 30_000,
                type: "hot"
            })
            return stages;
        })

        const numberOfStages = milliseconds / 30_000

        for (let i = 0; i < numberOfStages; i++) {
            const firstStageStart = (i + 1) * 30_000
            const firstStageEnd = firstStageStart + 6_000
            const lastStageEnd = firstStageEnd + 24_000

            setStages(stages => {
                stages.push({
                    start: firstStageStart,
                    end: firstStageEnd,
                    type: "cold"
                })
                return stages;
            })

            if (i + 1 === numberOfStages) {
                setStages(stages => {
                    stages.push({
                        start: lastStageEnd,
                        end: lastStageEnd + 30_000,
                        type: "hot"
                    })
                    return stages;
                })
            } else {
                setStages(stages => {
                    stages.push({
                        start: firstStageEnd,
                        end: lastStageEnd,
                        type: "hot"
                    })
                    return stages;
                })
            }
        }
        console.log(stages)
    }, [stages])

    return (
        <Flex px={4} direction="column" height="calc(100svh - 16px)">
            <Timer time={time} />
            <Stages stages={stages} time={time} />
            <Flex gap={4}>
                <Button flex={1} colorScheme='red' onClick={end}>Terminer</Button>
                {isPaused ? <Button flex={1} colorScheme='green' onClick={() => setIsPaused(false)}>Démarrer</Button> : <Button flex={1} colorScheme='orange' onClick={() => setIsPaused(true)}>Stop</Button>}
            </Flex>
        </Flex>
    )
}

export default Session