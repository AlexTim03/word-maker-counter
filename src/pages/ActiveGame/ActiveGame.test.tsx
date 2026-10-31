import { MemoryRouter } from 'react-router';
import { MantineProvider } from '@mantine/core';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ActiveGameContextProvider } from 'contexts/ActiveGameContext';
import { ActiveGame } from './ActiveGame';

describe('ActiveGame', () => {
    it('показывает предупреждение при прямом переходе без активной игры', () => {
        render(
            <MantineProvider>
                <ActiveGameContextProvider>
                    <MemoryRouter>
                        <ActiveGame />
                    </MemoryRouter>
                </ActiveGameContextProvider>
            </MantineProvider>
        );

        expect(screen.getByText('Нет активной игры.')).toBeInTheDocument();
    });
});
