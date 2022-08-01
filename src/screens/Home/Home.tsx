import * as React from 'react'
import type { FC } from 'react'
import {
    Box,
    Stat,
    StatGroup,
    StatHelpText,
    StatLabel,
    StatNumber,
    VStack,
} from '@chakra-ui/react'
import { usePressure } from '../../config'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import { useMemo } from 'react'

export const Home: FC = () => {
    const { averageAndPeriod, results } = usePressure()

    const data = useMemo(
        () =>
            results.map(({ date, low, high }) => ({
                name: date,
                low,
                high,
            })),
        [results],
    )

    return (
        <VStack>
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
            <Box display={'flex'} h={500} w={'100vw'}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="low"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                        />
                        <Line type="monotone" dataKey="high" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </VStack>
    )
}
