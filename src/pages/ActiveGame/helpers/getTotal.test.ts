import { describe, expect, it } from 'vitest';
import { getTotal } from './getTotal';

describe('getTotal', () => {
    it('возвращает ноль для пустого списка', () => {
        expect(getTotal([])).toBe(0);
    });

    it('суммирует очки раунда', () => {
        expect(getTotal([1, 2, 3])).toBe(6);
    });

    it('учитывает нулевые очки', () => {
        expect(getTotal([0, 5, 0])).toBe(5);
    });
});
