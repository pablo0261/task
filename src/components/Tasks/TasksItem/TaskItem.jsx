import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./TaskItem.module.sass";
import editIcon from "../../../images/iconEdit4.png";
import CreateTask from "../../Tasks/CreateTasks/CreatTasks";
import { useTasks } from "../../../views/myTasks/MyTasksView";

const TaskItem = ({ task }) => {
  const { task_id, title, description, username, status } = task;
  const { handleUpdateTask, handleDeleteTask } = useTasks();
  const [currentStatus, setCurrentStatus] = useState(status);
  const [showForm, setShowForm] = useState(false);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
    handleUpdateTask(task_id, newStatus);
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#a8aa17"; // Amarillo
      case "In Progress":
        return "#2e801e"; // Verde
      case "Blocked":
        return "#ad3838"; // Rojo
      case "Completed":
        return "#01004E"; // Azul oscuro
      default:
        return "#000"; // Por defecto negro
    }
  };

  const selectStyle = {
    backgroundColor: getStatusColor(currentStatus), // Cambia el fondo
    color: '#fff', // Asegúrate de que el texto sea legible
  };

  return (
    <li key={task_id} className={styles.taskItem}>
      <h2>{title}</h2>
      <div className={styles.description}>
        <strong>Description: </strong>
        <p>{description}</p>{" "}
      </div>
      <div className={styles.assigned}>
        <strong>Assigned To:</strong>
        <p>{username}</p>{" "}
      </div>
      <select
        className={styles.status}
        value={currentStatus}
        onChange={handleStatusChange}
        style={selectStyle}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Blocked">Blocked</option>
        <option value="Completed">Completed</option>
      </select>
      <button onClick={() => handleDeleteTask(task_id)}>Eliminar</button>
      <div className={styles.divButton}>
        <img
          className={styles.editButton}
          src={editIcon}
          alt={"Edit"}
          onClick={toggleFormVisibility}
        />
      </div>
      {showForm && <CreateTask setShowForm={setShowForm} taskToEdit={task} />}
    </li>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    task_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["Pending", "In Progress", "Blocked", "Completed"])
      .isRequired,
  }).isRequired,
};

export default TaskItem;
