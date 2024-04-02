import React, { JSX } from 'react';
import { AppShell as BaseAppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from 'components/Navbar';
import { Logo } from 'components/Logo';

export interface AppShellProps {
    routeComponent: JSX.Element;
}

export const AppShell = ({ routeComponent }: AppShellProps) => {
    const [opened, { toggle }] = useDisclosure(false);

    return (
        <>
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
                        <div>
                            <Logo />
                        </div>
                    </Group>
                </BaseAppShell.Header>
                <BaseAppShell.Navbar p="md">
                    <Navbar toggle={toggle} />
                </BaseAppShell.Navbar>
                <BaseAppShell.Main>{routeComponent}</BaseAppShell.Main>
            </BaseAppShell>
        </>
    );
};
