import * as React from 'react'
import type { FC } from 'react'
import { Box, Button } from '@chakra-ui/react'
import { useUserLogin } from '../../config'

export const Home: FC = () => {
    const { logout } = useUserLogin()
    return (
        <Box>
            <Button onClick={logout}>Logout</Button>
        </Box>
    )
}
