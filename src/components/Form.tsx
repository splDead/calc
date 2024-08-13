'use client';

import { Button, Divider, Stack, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

export type Inputs = {
    countOfCoupons: string
    amountOfCoupons: string
    nominal: string
    nkd: string
    amount: string
    endOfDate: Date | null
    name: string
}

type Props = {
    onSubmit: (data: Inputs) => void
}

const defaultValues = {
    name: '',
    countOfCoupons: '',
    amountOfCoupons: '',
    nominal: '1000',
    nkd: '',
    amount: '',
    endOfDate: null,
};

const Form = (props: Props) => {
    const {
        handleSubmit,
        control,
        formState: { isValid },
        reset,
        setValue,
    } = useForm<Inputs>({
        defaultValues,
    });
    
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        props.onSubmit(data);
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={2} divider={<Divider/>}>
                <Stack gap={2}>
                    <Controller
                        name='name'
                        control={control}
                        rules={{ required: true }}
                        render={({field}) =>
                            <TextField
                                size='small'
                                label='Имя'
                                fullWidth
                                {...field}
                            />
                        }
                    />
                    <Controller
                        name='countOfCoupons'
                        control={control}
                        rules={{required: true}}
                        render={({field}) =>
                            <TextField
                                size='small'
                                label='Количество купонов'
                                fullWidth
                                type='number'
                                inputProps={{
                                    min: 0,
                                    step: 1,
                                }}
                                {...field}
                            />
                        }
                    />
                    <Controller
                        name='amountOfCoupons'
                        control={control}
                        rules={{required: true}}
                        render={({field}) =>
                            <TextField
                                size='small'
                                label='Размер купона'
                                fullWidth
                                {...field}
                                type='number'
                                inputProps={{
                                    min: 0,
                                    step: 0.01,
                                }}
                            />
                        }
                    />
                    <Controller
                        name='nkd'
                        control={control}
                        rules={{required: true}}
                        render={({field}) =>
                            <TextField
                                {...field}
                                size='small'
                                label='Накопленный купонный доход'
                                fullWidth
                                type='number'
                                inputProps={{
                                    min: 0,
                                    step: 0.01,
                                }}
                            />
                        }
                    />
                    <Controller
                        name='nominal'
                        control={control}
                        rules={{required: true}}
                        render={({field}) =>
                            <TextField
                                size='small'
                                label='Номинал'
                                fullWidth
                                {...field}
                                type='number'
                                inputProps={{
                                    min: 0,
                                    step: 0.01,
                                }}
                            />
                        }
                    />
                    <Stack gap={2} direction='row'>
                        <Button
                            variant='outlined'
                            onClick={() => {
                                setValue('nominal', '1000');
                            }}
                            fullWidth
                            size='small'
                        >
                            1000
                        </Button>
                    </Stack>
                    <Controller
                        name='amount'
                        control={control}
                        rules={{required: true}}
                        render={({field}) =>
                            <TextField
                                {...field}
                                size='small'
                                label='Текущая стоимость'
                                fullWidth
                                type='number'
                                inputProps={{
                                    min: 0,
                                    step: 0.01,
                                }}
                            />
                        }
                    />
                    <Controller
                        name='endOfDate'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange } }) =>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DateField
                                    value={value}
                                    onChange={onChange}
                                    size='small'
                                    format='DD/MM/YYYY'
                                />
                            </LocalizationProvider>
                        }
                    />
                </Stack>
                <Stack gap={2} direction='row'>
                    <Button
                        fullWidth
                        variant='outlined'
                        onClick={() => {
                            reset(defaultValues);
                        }}
                    >
                        Очистить
                    </Button>
                    <Button
                        fullWidth
                        variant='contained'
                        disabled={!isValid}
                        type='submit'
                    >
                        Посчитать
                    </Button>
                </Stack>
            </Stack>
        </form>
    );
}

export default Form;
