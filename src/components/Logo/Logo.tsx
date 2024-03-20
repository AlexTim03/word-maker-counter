import React from 'react';
import { Group } from '@mantine/core';
import { IconLetterW, IconLetterM } from '@tabler/icons-react';

export const Logo = () => (
    <Group>
        <IconLetterW stroke={2} size={24} />
        <IconLetterM stroke={2} size={24} />
    </Group>
);
