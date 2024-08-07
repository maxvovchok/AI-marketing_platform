import { Routes, Route } from 'react-router-dom';
import { Table } from '../page/table/Table';
import { Card } from '../page/card/Card';

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/:id" element={<Card />} />
      </Routes>
    </div>
  );
};
