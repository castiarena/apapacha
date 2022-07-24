import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
} from '@chakra-ui/react'
import React, { FC } from 'react'
import * as yup from 'yup'
import { InferType } from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { usePressure } from '../../config'

type TAddPressureModalProps = {
    isOpen: boolean
    onClose: () => void
}

const pressureFormSchema = yup.object({
    high: yup.number().required(),
    low: yup.number().required(),
    date: yup.date().required(),
})

type PressureForm = InferType<typeof pressureFormSchema>

export const AddPressureModal: FC<TAddPressureModalProps> = ({
    isOpen,
    onClose,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<PressureForm>({
        resolver: yupResolver(pressureFormSchema),
    })

    const { setPressure } = usePressure()

    const onSubmit = async ({ high, low, date }: PressureForm) => {
        await setPressure({
            high,
            low,
            date: date.getTime(),
        })
        onClose()
        reset()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={6} alignItems="flex-start">
                            <Input
                                {...register('high')}
                                placeholder="high"
                                type="number"
                            />
                            {errors.high?.message && (
                                <Text color="red">{errors.high.message}</Text>
                            )}

                            <Input
                                {...register('low')}
                                placeholder="low"
                                type="number"
                            />
                            {errors.low?.message && (
                                <Text color="red">{errors.low.message}</Text>
                            )}

                            <Input
                                {...register('date')}
                                placeholder="date"
                                type="date"
                            />
                            {errors.date?.message && (
                                <Text color="red">{errors.date.message}</Text>
                            )}
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            variant="ghost"
                            mr={3}
                            onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue" type="submit">
                            Load
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}
