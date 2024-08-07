import { TaskCard } from '../../components/taskCard/TaskCard';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const Card = () => {
  const params = useParams();
  const id = params.id;
  const selector = useSelector(state => state.tasks.tasks);

  return <TaskCard card={selector[id]} />;
};
