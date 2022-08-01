import * as React from 'react'
import type { FC } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Button,
    Heading,
    HStack,
    Link,
    Input,
    Text,
    VStack,
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate, Navigate } from 'react-router-dom'
import type { InferType } from 'yup'
import { RoutesScreens } from '../routes'
import { useUser, useUserLogin } from '../../config'

const loginFormSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
})

type LoginForm = InferType<typeof loginFormSchema>

export const Login: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: yupResolver(loginFormSchema),
    })
    const { isLoggedIn } = useUser()
    const { login, loadingUser } = useUserLogin()
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<LoginForm> = async (data) => {
        try {
            await login(data.email, data.password)
        } catch (exception) {
            console.log(exception)
            return
        }

        navigate('/')
    }

    return isLoggedIn ? (
        <Navigate to={RoutesScreens.HOME} />
    ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={2} alignItems="flex-start">
                <Heading>Welcome to Apapacha</Heading>
                <HStack spacing={1}>
                    <Text>
                        Please identify yourself or if you not have an account
                        you can
                        <Link p={1} as={RouterLink} to={RoutesScreens.REGISTER}>
                            register yourself
                        </Link>
                    </Text>
                </HStack>
                <Input
                    {...register('email')}
                    placeholder="email"
                    autoComplete="username"
                />
                {errors.email?.message && (
                    <Text color="red">{errors.email.message}</Text>
                )}
                <Input
                    {...register('password')}
                    type="password"
                    placeholder="password"
                    autoComplete="current-password"
                />
                {errors.password?.message && (
                    <Text color="red">{errors.password.message}</Text>
                )}
                <HStack spacing={2}>
                    <Button type="submit" isLoading={loadingUser}>
                        Login
                    </Button>
                </HStack>
            </VStack>
        </form>
    )
}
