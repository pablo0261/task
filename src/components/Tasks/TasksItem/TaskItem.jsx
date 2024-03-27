import  { useState } from 'react';
import PropTypes from 'prop-types';

const TaskItem = ({ task, onUpdateStatus, onDelete }) => {
  const { id, title, description, assigned_to, status } = task;
  const [currentStatus, setCurrentStatus] = useState(status);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
    onUpdateStatus(id, newStatus);
  };

  return (
    <li>
      <h2>{title}</h2>
      <p>Description: {description}</p>
      <p>Assigned To: {assigned_to}</p>
      <select value={currentStatus} onChange={handleStatusChange}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Blocked">Blocked</option>
        <option value="Completed">Completed</option>
      </select>
      <button onClick={() => onDelete(id)}>Eliminar</button>
    </li>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    assigned_to: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['Pending', 'In Progress', 'Blocked', 'Completed']).isRequired
  }).isRequired,
  onUpdateStatus: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default TaskItem;
