import React from 'react';
import { createTheme, MantineProvider, CSSVariablesResolver } from '@mantine/core';
import { ActiveGameContextProvider } from 'contexts/ActiveGameContext';
import { Routing } from 'routing';

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
        <ActiveGameContextProvider>
            <Routing />
        </ActiveGameContextProvider>
    </MantineProvider>
);

export default App;
