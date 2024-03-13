import React from 'react';
import { createTheme, MantineProvider, CSSVariablesResolver } from '@mantine/core';
import { AppShell } from './AppShell';
import '@mantine/core/styles.css';

const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'cyan',
});

const resolver: CSSVariablesResolver = () => ({
    variables: {},
    light: {
        '--mantine-color-body': '#e6fcf5',
    },
    dark: {},
});
const App = () => (
    <MantineProvider theme={theme} cssVariablesResolver={resolver} defaultColorScheme="auto">
        <AppShell />
    </MantineProvider>
);

export default App;
