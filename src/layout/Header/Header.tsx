import React, { FC } from 'react'
import {
    HStack,
    Box,
    Avatar,
    Text,
    Heading,
    Container,
    Link,
} from '@chakra-ui/react'
import { useUser } from '../../config'
import { Link as RouterLink } from 'react-router-dom'
import { RoutesScreens } from '../../screens'

const useHeaderRoutes = () => {
    return []
}

export const Header: FC = () => {
    const { user } = useUser()
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
                        <Text>{user?.name || user?.email}</Text>
                        <Avatar name={user?.name} />
                    </HStack>
                </HStack>
            </Container>
        </Box>
    )
}
