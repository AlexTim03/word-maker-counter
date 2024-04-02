import React from 'react';
import { Title, Table, TableData } from '@mantine/core';
import { useActiveGameContext } from 'contexts/ActiveGameContext';

export const Result = () => {
    const { players, firstPlayer, roundsCount } = useActiveGameContext();
    const position = players.findIndex(({ name }) => name === firstPlayer);
    const normalizePlayers = position > 0 ? [...players.slice(position), ...players.slice(0, position)] : players;

    const tableData: TableData = {
        head: ['Раунд \\ Игрок', ...normalizePlayers.map(({ name }) => name)],
        body: [[1], [2], [3]],
    };

    return (
        <>
            <Title order={3}>Результат игры</Title>
            <Table data={tableData} stickyHeader stickyHeaderOffset={60} striped withTableBorder withColumnBorders />
        </>
    );
};
