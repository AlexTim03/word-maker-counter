import React from 'react';
import { AppShell as BaseAppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Routing } from 'routing';

export const AppShell = () => {
    const [opened, { toggle }] = useDisclosure(false);

    return (
        <BaseAppShell
            header={{ height: 40 }}
            navbar={{
                width: 300,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <BaseAppShell.Header>
                <Group justify="space-between">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="lg" />
                    <div>Logo</div>
                </Group>
            </BaseAppShell.Header>
            <BaseAppShell.Navbar p="md">Navbar</BaseAppShell.Navbar>
            <BaseAppShell.Main>
                <Routing />
            </BaseAppShell.Main>
        </BaseAppShell>
    );
};
