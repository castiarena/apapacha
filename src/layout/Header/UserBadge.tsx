import * as React from 'react'
import type { FC } from 'react'
import {
    Avatar,
    Divider,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react'
import { useUser } from '../../config'

export const UserBadge: FC = () => {
    const { user } = useUser()

    return (
        <Menu>
            <MenuButton>
                <Avatar name={user?.name || user?.email} />
            </MenuButton>
            <MenuList>
                <Text px={3} py={4}>
                    {user?.email}
                </Text>
                <Divider />
                <MenuItem>Profile</MenuItem>
            </MenuList>
        </Menu>
    )
}
