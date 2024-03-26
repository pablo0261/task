import PropTypes from 'prop-types';
import TaskItem from '../TasksItem/TaskItem';
import './TaskList.module.sass';

const TaskList = ({ tasks }) => {
      return (
        <div>
        <h2>Lista de Tareas</h2>
        <ul>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
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
      status: PropTypes.string.isRequired,
      assigned_to: PropTypes.string.isRequired, // Este tipo de dato debería ser modificado según la estructura de tu base de datos
    })
  ).isRequired,
};

export default TaskList;