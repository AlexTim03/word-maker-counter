import React from 'react';
import styles from './Point.module.css';

interface PointProps {
    point: number;
}

export const Point = ({ point }: PointProps) => <span className={styles.container}>{point}</span>;
