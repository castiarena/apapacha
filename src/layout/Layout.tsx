import * as React from 'react'
import type { FCC } from '../react.types'
import { Box, Container, HStack, Spinner } from '@chakra-ui/react'
import { useUser } from '../config'
import { Header } from './Header'

export const Layout: FCC = ({ children }) => {
    const { loading, isLoggedIn } = useUser()

    if (loading) {
        return (
            <HStack
                justifyContent={'center'}
                alignItems={'center'}
                height={'full'}>
                <Spinner boxSize={12} />
            </HStack>
        )
    }

    if (!isLoggedIn) {
        return (
            <HStack
                justifyContent={'center'}
                alignItems={'center'}
                height={'100vh'}>
                <Box
                    p={12}
                    backgroundColor={'gray.50'}
                    borderRadius={'xl'}
                    maxWidth={'31rem'}
                    boxShadow={'md'}>
                    {children}
                </Box>
            </HStack>
        )
    }

    return (
        <Box>
            <Header />
            <Container py={4} maxWidth={'container.lg'}>
                {children}
            </Container>
        </Box>
    )
}
