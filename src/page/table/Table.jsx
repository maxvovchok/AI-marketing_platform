import React from 'react';
import { TaskTable } from '../../components/taskTable/TaskTable';
import { CardTable } from '../../components/cardTable/CardTable';
import styles from './Table.module.css';

export const Table = () => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Dimension</th>
            <th>Template ID</th>
            <th>Images</th>
            <th>Text</th>
            <th>Ammount</th>
            <th>Gen Type</th>
            <th>Gen Tasks</th>
            <th>Result Ads</th>
          </tr>
        </thead>
        <tbody>
          <TaskTable />
          <CardTable />
        </tbody>
      </table>
    </div>
  );
};
