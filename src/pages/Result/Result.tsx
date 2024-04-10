import React from 'react';
import { Title, Table, TableData } from '@mantine/core';
import { useActiveGameContext } from 'contexts/ActiveGameContext';
import { getPointsMatrix } from './helpers/getPointsMatrix';

export const Result = () => {
    const { players, roundsCount } = useActiveGameContext();

    const tableData: TableData = {
        head: ['Раунд \\ Игрок', ...players.map(({ name }) => name)],
        body: getPointsMatrix(players, roundsCount),
    };

    return (
        <>
            <Title order={3}>Результат игры</Title>
            <Table data={tableData} stickyHeader stickyHeaderOffset={60} striped withTableBorder withColumnBorders />
        </>
    );
};
