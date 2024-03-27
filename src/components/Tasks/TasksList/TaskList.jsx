import PropTypes from 'prop-types';
import TaskItem from '../TasksItem/TaskItem.jsx';


const TaskList = ({ tasks, onUpdateStatus, onDelete }) => {
  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdateStatus={onUpdateStatus}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      assigned_to: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['Pending', 'In Progress', 'Blocked', 'Completed']).isRequired
    })
  ).isRequired,
  onUpdateStatus: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TaskList;
