import * as React from 'react'
import type { FC } from 'react'
import { Box, Heading, HStack } from '@chakra-ui/react'

export const NotFound: FC = () => {
    return (
        <Box display={'flex'} alignItems={'stretch'} flexDirection={'row'}>
            <Box flex={1}>
                <Heading>404 Page not found</Heading>
            </Box>
        </Box>
    )
}
