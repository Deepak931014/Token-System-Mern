import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import QRCode from 'qrcode.react';
import { Box, Button, Input, Select, Stack } from '@chakra-ui/react';

const GenerateToken = () => {
    const { register, handleSubmit } = useForm();
    const [qrCode, setQrCode] = React.useState('');

    const onSubmit = async (data) => {
        const response = await axios.post('http://localhost:5000/generate', data);
        setQrCode(response.data.qrCode);
    };

    return (
        <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                    <Input placeholder="Name" {...register('userName')} />
                    <Select {...register('slot')}>
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                    </Select>
                    <Input placeholder="Count" type="number" {...register('count')} />
                    <Button type="submit">Generate Token</Button>
                </Stack>
            </form>
            {qrCode && <QRCode value={qrCode} />}
        </Box>
    );
};

export default GenerateToken;
