'use client';

import { Button, Divider, Stack, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

export type Inputs = {
    countOfCoupons: number
    amountOfCoupons: number
    nominal: number
    nkd: number
    amount: number
    endOfDate: Date
}

type Props = {
    onSubmit: (data: Inputs) => void
}

const Form = (props: Props) => {
    const {
        handleSubmit,
        control,
        formState: { isValid },
        reset,
    } = useForm<Inputs>();
    
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
        props.onSubmit(data);
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={2} divider={<Divider/>}>
                <Stack gap={2}>
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
                            />
                        }
                    />
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
                        onClick={() => reset()}
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
