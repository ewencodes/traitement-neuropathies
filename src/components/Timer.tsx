import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Timer: React.FC<{ time: number }> = ({ time }) => {
    return (
        <Box>
            <Text textAlign="center">Temps total</Text>
            <Text fontSize="4xl" textAlign="center">
                {("0" + Math.floor((time / 6000) % 60)).slice(-2)}:{("0" + Math.floor((time / 100) % 60)).slice(-2)}
            </Text>
        </Box>
    );
}

export default Timer