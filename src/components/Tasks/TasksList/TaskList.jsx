import PropTypes from 'prop-types';
import TaskItem from '../TasksItem/TaskItem.jsx';
import { useTasks } from '../../../views/myTasks/MyTasksView.jsx';
import style from './TaskList.module.sass';
import NabBar from '../../NabBar/NabBar.jsx';

const TaskList = () => {
  const { tasks } = useTasks();

  return (
    <div className={style.taskList}>
      <NabBar/>
      <ul className={style.ulTask}>
        {tasks.map(task => (
          <TaskItem
            key={task.id} 
            task={task}
          />
        ))}
      </ul>
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired, // Cambia task_id a id
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      assigned_to: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['Pending', 'In Progress', 'Blocked', 'Completed']).isRequired
    })
  ).isRequired,
};

export default TaskList;
