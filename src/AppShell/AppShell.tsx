import React from 'react';
import { AppShell as BaseAppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export const AppShell = () => {
    const [opened, { toggle }] = useDisclosure(false);

    return (
        <BaseAppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <BaseAppShell.Header>
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" />
                <div>Logo</div>
            </BaseAppShell.Header>
            <BaseAppShell.Navbar p="md">Navbar</BaseAppShell.Navbar>
            <BaseAppShell.Main>Main</BaseAppShell.Main>
        </BaseAppShell>
    );
};
