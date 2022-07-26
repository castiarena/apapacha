import * as React from 'react'
import type { FC } from 'react'
import {
    Avatar,
    Badge,
    HStack,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react'
import { useUser, useUserLogin } from '../../config'
import { Link } from 'react-router-dom'
import { RoutesScreens } from '../../screens'

export const UserBadge: FC = () => {
    const { user } = useUser()
    const { logout } = useUserLogin()

    return (
        <Menu>
            <MenuButton>
                <Avatar name={user?.name || user?.email} />
            </MenuButton>
            <MenuList>
                <HStack>
                    <Badge
                        width={'100%'}
                        textAlign={'center'}
                        colorScheme={'orange'}>
                        {user?.email}
                    </Badge>
                </HStack>
                <MenuDivider />
                <MenuItem to={RoutesScreens.ACCOUNT} as={Link}>
                    Account
                </MenuItem>
                <MenuDivider />

                <MenuItem onClick={logout}>Sign out</MenuItem>
            </MenuList>
        </Menu>
    )
}
