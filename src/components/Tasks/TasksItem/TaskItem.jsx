import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./TaskItem.module.sass";
import editIcon from "../../../images/iconEdit4.png";
import CreateTask from "../../Tasks/CreateTasks/CreatTasks";

const TaskItem = ({ task, onUpdate, onDelete, onFullUpdate }) => {
  const { task_id, title, description, assigned_to, status } = task;
  const [currentStatus, setCurrentStatus] = useState(status);
  const [showForm, setShowForm] = useState(false);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
    onUpdate(task_id, newStatus);
    console.log(task_id, newStatus, "onUpdate");
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#a8aa17"; // Amarillo
      case "In Progress":
        return "#2e801e"; // Verde
      case "Blocked":
        return "#FF4E4E"; // Rojo
      case "Completed":
        return "#01004E"; // Azul oscuro
      default:
        return "#000"; // Por defecto negro
    }
  };
  const taskItemStyle = {
    border: `1px solid ${getStatusColor(currentStatus)}`,
  };

  return (
    <div>
      {showForm && <div className={styles.showForm}><CreateTask setShowForm={toggleFormVisibility} /></div>}
      <li key={task.task_id} style={taskItemStyle} className={styles.taskItem}>
        <h2>{title}</h2>
        <div className={styles.description}>
          <strong>Description: </strong>
          <p>{description}</p>{" "}
        </div>
        <div className={styles.assigned}>
          <strong>Assigned To:</strong>
          <p>{assigned_to}</p>{" "}
        </div>
        <select
          className={styles.status}
          value={currentStatus}
          onChange={handleStatusChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Blocked">Blocked</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={() => onDelete(task.task_id)}>Eliminar</button>
      
      <div className={styles.divButton}>
        <img
          className={styles.editButton}
          src={editIcon}
          alt={"Edit"}
          onClick={toggleFormVisibility}
        ></img>
      </div>
      </li>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    task_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    assigned_to: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["Pending", "In Progress", "Blocked", "Completed"])
      .isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onFullUpdate: PropTypes.func.isRequired,
};

export default TaskItem;
