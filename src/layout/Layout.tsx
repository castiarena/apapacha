import * as React from 'react'
import { Suspense } from 'react'
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
            <Suspense fallback={<Spinner boxSize={12} />}>
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
            </Suspense>
        )
    }

    return (
        <Box display={'flex'} flexDirection={'column'} minH={'100vh'}>
            <Header />
            <Container py={4} maxWidth={'container.lg'}>
                {children}
            </Container>
        </Box>
    )
}
