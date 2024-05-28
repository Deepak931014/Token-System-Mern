import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Box, Button, Input, Stack } from '@chakra-ui/react';
import { QrReader } from 'react-qr-reader';

const VerifyToken = () => {
    const [result, setResult] = React.useState('');
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const response = await axios.post('http://localhost:5000/verify', data);
        setResult(response.data.valid ? 'Token is valid' : 'Token is invalid');
    };

    const handleScan = async (data) => {
        if (data) {
            const response = await axios.post('http://localhost:5000/verify', { token: data });
            setResult(response.data.valid ? 'Token is valid' : 'Token is invalid');
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                    <Input placeholder="Token" {...register('token')} />
                    <Button type="submit">Verify Token</Button>
                </Stack>
            </form>
            <QrReader delay={300} onError={handleError} onScan={handleScan} />
            <Box>{result}</Box>
        </Box>
    );
};

export default VerifyToken;
