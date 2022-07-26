import * as React from 'react'
import type { FC } from 'react'
import {
    Box,
    Stat,
    StatGroup,
    StatHelpText,
    StatLabel,
    StatNumber,
} from '@chakra-ui/react'
import { usePressure } from '../../config'

export const Home: FC = () => {
    const { averageAndPeriod } = usePressure()

    return (
        <Box>
            <StatGroup>
                <Stat>
                    <StatLabel>Low pressure Average</StatLabel>
                    <StatNumber>{averageAndPeriod.lowAverage}</StatNumber>
                    <StatHelpText>
                        from {averageAndPeriod.from} to {averageAndPeriod.to}
                    </StatHelpText>
                </Stat>
                <Stat>
                    <StatLabel>High pressure Average</StatLabel>
                    <StatNumber>{averageAndPeriod.highAverage}</StatNumber>
                    <StatHelpText>
                        from {averageAndPeriod.from} to {averageAndPeriod.to}
                    </StatHelpText>
                </Stat>
            </StatGroup>
        </Box>
    )
}
