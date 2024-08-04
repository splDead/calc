'use client';

import React, { useState, useEffect } from 'react';
import { Typography, Paper, Stack, Box, Divider } from '@mui/material';
import dayjs from 'dayjs';

import Form, { Inputs } from '../src/components/Form';

export default function Page() {
    const [data, setData] = useState<Inputs>();
    const [profit, setProfit] = useState<number>();
    
    useEffect(() => {
        if (data) {
            const months = dayjs(data.endOfDate).diff(dayjs(), 'month');
            const coupons = (+data.amountOfCoupons * +data.countOfCoupons) / 1.13;
            const procents = (((coupons - +data.nkd + +data.nominal) * 100) / +data.amount);
            const final = (procents - 100) / (months / 12);
            setProfit(final);
        }
    }, [data]);
    
    return (
        <Stack gap={2}>
            <Typography variant='h4'>
                Калькулятор
            </Typography>
            <Paper elevation={4}>
                <Box p={2}>
                    <Stack gap={2} divider={<Divider />}>
                        {profit && <Typography>Доходность: <b>{profit.toFixed(2)}%</b></Typography>}
                        <Form
                            onSubmit={setData}
                        />
                    </Stack>
                </Box>
            </Paper>
        </Stack>
    );
}
