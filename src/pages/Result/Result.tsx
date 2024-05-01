import React from 'react';
import { Title, Table, TableData, Text, Group } from '@mantine/core';
import { useActiveGameContext } from 'contexts/ActiveGameContext';
import { getPointsMatrix } from './helpers/getPointsMatrix';
import { getWinners } from './helpers/getWinners';

export const Result = () => {
    const { players, roundsCount } = useActiveGameContext();
    const matrix = getPointsMatrix(players, roundsCount);
    const winners = getWinners(players, matrix);

    const tableData: TableData = {
        head: ['Раунд \\ Игрок', ...players.map(({ name }) => name)],
        body: matrix,
    };

    return (
        <>
            <Title order={3}>Результат игры</Title>
            <Table data={tableData} stickyHeader stickyHeaderOffset={60} striped withTableBorder withColumnBorders />

            <Group m={10} gap="xs">
                <Text fw={700} component="span" size="lg">
                    Первое место:
                </Text>
                <Text component="span" size="lg">
                    {winners.first.name}, {winners.first.points} оч.
                </Text>
            </Group>
            <Group m={10} gap="xs">
                <Text fw={700} component="span" size="lg">
                    Второе место:
                </Text>
                <Text component="span" size="lg">
                    {winners.second.name}, {winners.second.points} оч.
                </Text>
            </Group>
            {winners.third && (
                <Group m={10} gap="xs">
                    <Text fw={700} component="span" size="lg">
                        Третье место:
                    </Text>
                    <Text component="span" size="lg">
                        {winners.third.name}, {winners.third.points} оч.
                    </Text>
                </Group>
            )}
        </>
    );
};
