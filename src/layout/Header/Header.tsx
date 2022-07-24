import React, { FC } from 'react'
import { HStack, Box, Heading, Container, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { RoutesScreens } from '../../screens'
import { UserBadge } from './UserBadge'

export const Header: FC = () => {
    return (
        <Box
            py={4}
            borderColor={'gray.20'}
            borderBottomWidth={'thin'}
            boxShadow={'sm'}
            borderStyle={'solid'}
            position={'sticky'}
            backgroundColor={'gray.50'}>
            <Container maxWidth={'container.lg'}>
                <HStack justifyContent="space-between">
                    <HStack gap={4} alignItems={'center'}>
                        <Heading as={RouterLink} to={RoutesScreens.HOME}>
                            Apapacha
                        </Heading>
                        <Link as={RouterLink} to={RoutesScreens.PRESSURE}>
                            Pressure
                        </Link>
                    </HStack>
                    <HStack gap={4}>
                        <UserBadge />
                    </HStack>
                </HStack>
            </Container>
        </Box>
    )
}
