import { useState } from 'react';
import PropTypes from 'prop-types';

import './TaskItem.module.sass';

const TaskItem = ({ id, title, description, assigned_to, status, onDelete, onUpdateStatus }) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
    onUpdateStatus(id, newStatus);
  };

  return (
    <li className="tasks__item">
      <h2>{title}</h2>
      <p>Description: {description}</p>
      <p>Assigned To: {assigned_to}</p>
      <select value={currentStatus} onChange={handleStatusChange} className={`tasks__item__status-select`}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Blocked">Blocked</option>
        <option value="Completed">Completed</option>
      </select>
      <button className="tasks__item__remove button" onClick={() => onDelete(id)}>x</button>
    </li>
  );
};

TaskItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  assigned_to: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['Pending', 'In Progress', 'Blocked', 'Completed']).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdateStatus: PropTypes.func.isRequired,
};

export default TaskItem;
