import React from 'react';
import { createTheme, MantineProvider, MantineColorsTuple } from '@mantine/core';
import { AppShell } from './AppShell';
import '@mantine/core/styles.css';

//https://mantine.dev/colors-generator/?color=2BDD66
const greenColors: MantineColorsTuple = [
    '#e5feee',
    '#d2f9e0',
    '#a8f1c0',
    '#7aea9f',
    '#53e383',
    '#3bdf70',
    '#2bdd66',
    '#1ac455',
    '#0caf49',
    '#00963c',
];

const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'cyan',
    colors: {
        greenColors,
    },
});

const App = () => (
    <MantineProvider theme={theme}>
        <AppShell />
    </MantineProvider>
);

export default App;
