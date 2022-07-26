import * as React from 'react'
import type { FC } from 'react'
import {
    Avatar,
    Code,
    Heading,
    List,
    ListItem,
    Spinner,
    Tag,
    VStack,
} from '@chakra-ui/react'
import { useUser } from '../../config'

export const Account: FC = () => {
    const { user } = useUser()

    if (!user) {
        return <Spinner />
    }

    return (
        <VStack alignItems={'flex-start'}>
            <Heading>Welcome {user.name || user.email}</Heading>
            <Avatar name={user.name || user.email} />
            <List spacing={2}>
                <ListItem>
                    Name: <Tag> {user.name || 'not set'}</Tag>
                </ListItem>
                <ListItem>
                    Email: <Tag> {user.email || 'not set'}</Tag>
                </ListItem>
                <ListItem>
                    Age: <Tag> {user.email || 'not set'}</Tag>
                </ListItem>
            </List>
        </VStack>
    )
}
