import React, { FC } from 'react'
import { Heading, Button, useDisclosure, VStack, Box } from '@chakra-ui/react'
import { AddPressureModal } from './AddPressureModal'
import { TablePressureResults } from './TablePressureResults'

export const Pressure: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <VStack alignItems="stretch">
            <Heading>Latest result of you blood pressure</Heading>
            <Box>
                <Button onClick={onOpen}>Add mesure</Button>
            </Box>
            <TablePressureResults />
            <AddPressureModal onClose={onClose} isOpen={isOpen} />
        </VStack>
    )
}
