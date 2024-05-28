import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import GenerateToken from './GenerateToken';
import VerifyToken from './VerifyToken';

const App = () => {
    return (
        <ChakraProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<GenerateToken />} />
                    <Route path="/generate" element={<GenerateToken />} />
                    <Route path="/verify" element={<VerifyToken />} />
                </Routes>
            </Router>
        </ChakraProvider>
    );
};

export default App;
