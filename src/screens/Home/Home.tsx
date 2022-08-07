import * as React from 'react'
import type { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
    Box,
    Flex,
    Heading,
    HStack,
    Link,
    Text,
    VStack,
} from '@chakra-ui/react'
import { usePressure } from '../../config'
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area,
    BarChart,
    Bar,
} from 'recharts'
import { useMemo } from 'react'
import { format } from 'date-fns'
import { RoutesScreens } from '../routes'

export const Home: FC = () => {
    const { averageAndPeriod, results } = usePressure()

    const data = useMemo(
        () =>
            results.map(({ date, low, high }) => ({
                name: format(new Date(date), 'dd/MM/yyyy - hh:mm - eeee'),
                low,
                high,
            })),
        [results],
    )

    return (
        <VStack gap={6}>
            <Heading>Average</Heading>
            <Text>
                You can check all the pressure entries at{' '}
                <Link as={RouterLink} to={RoutesScreens.PRESSURE}>
                    pressure
                </Link>
            </Text>
            <Flex h={300} w={['100%', '50%']}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={[
                            {
                                lowAverage: averageAndPeriod.lowAverage,
                                highAverage: averageAndPeriod.highAverage,
                                name: 'average',
                            },
                        ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={'lowAverage'} fill={'#0388f4'} />
                        <Bar dataKey={'highAverage'} fill={'#ff6c6c'} />
                    </BarChart>
                </ResponsiveContainer>
            </Flex>
            <Heading>Progress registry</Heading>
            <Box display={'flex'} h={500} w={'100%'}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
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
                        <Area
                            type="monotone"
                            dataKey="low"
                            activeDot={{ r: 8 }}
                        />
                        <Area type="monotone" dataKey="high" />
                    </AreaChart>
                </ResponsiveContainer>
            </Box>
        </VStack>
    )
}
