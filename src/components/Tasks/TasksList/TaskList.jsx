import PropTypes from 'prop-types';
import TaskItem from '../TasksItem/TaskItem.jsx';


const TaskList = ({ tasks, onDelete, onUpdate, onFullUpdate }) => {
  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul>
        {tasks.map(task => (
          <TaskItem
            key={task.task_id}
            task={task}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onFullUpdate={onFullUpdate}
          />
        ))}
      </ul>
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      task_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      assigned_to: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['Pending', 'In Progress', 'Blocked', 'Completed']).isRequired
    })
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onFullUpdate: PropTypes.func.isRequired
};

export default TaskList;
