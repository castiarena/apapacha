import * as React from 'react'
import type { FC } from 'react'
import {
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { usePressure } from '../../config'

export const TablePressureResults: FC = () => {
    const { results } = usePressure()

    return (
        <TableContainer>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Date</Th>
                        <Th isNumeric>High</Th>
                        <Th isNumeric>Low</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {results.map(({ date, high, low }) => (
                        <Tr key={date}>
                            <Td>
                                {format(new Date(date), 'dd/MM/yyyy hh:mm')}
                            </Td>
                            <Td isNumeric>{high}</Td>
                            <Td isNumeric>{low}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}
