import * as React from 'react'
import {
    Button,
    FormControl,
    Heading,
    HStack,
    Input,
    Link,
    Text,
    VStack,
} from '@chakra-ui/react'
import type { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useUserRegistration } from '../../config'
import { Link as RouterLink } from 'react-router-dom'
import { RoutesScreens } from '../routes'

type RegisterForm = {
    email: string
    password: string
}

const registerFormSchema = yup
    .object({
        email: yup.string().email().required(),
        password: yup.string().required(),
    })
    .required()

export const Register: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>({
        resolver: yupResolver(registerFormSchema),
    })
    const { registrate, isLoadingRegistration, error } = useUserRegistration()

    const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
        await registrate(data.email, data.password)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={2} alignItems="flex-start">
                <Heading>Welcome to Apapacha</Heading>
                <HStack spacing={1}>
                    <Text>
                        Please register yourself or just
                        <Link p={1} as={RouterLink} to={RoutesScreens.LOGIN}>
                            Login
                        </Link>
                        if you already got an account
                    </Text>
                </HStack>
                <FormControl>
                    <Input
                        {...register('email', {
                            pattern: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                        })}
                        placeholder="email"
                    />
                    {errors.email?.message && (
                        <Text color="red">{errors.email.message}</Text>
                    )}
                </FormControl>
                <FormControl>
                    <Input
                        {...register('password')}
                        type="password"
                        placeholder="password"
                    />
                    {errors.password?.message && (
                        <Text color="red">{errors.password.message}</Text>
                    )}
                    {error && <Text color="red">{error}</Text>}
                </FormControl>
                <Button type="submit" isLoading={isLoadingRegistration}>
                    Register
                </Button>
            </VStack>
        </form>
    )
}
