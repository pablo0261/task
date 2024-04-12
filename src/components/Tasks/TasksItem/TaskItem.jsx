import { useContext, useState } from "react";
import {  TasksContext  } from "../../../views/myTasks/MyTasksView";
import PropTypes from "prop-types";
import styles from "./TaskItem.module.sass";
import editIcon from "../../../images/iconEdit4.png";
import CreateTask from "../../Tasks/CreateTasks/CreatTasks";
import iconoDelete from "../../../images/iconDelete2.png";

const TaskItem = ({ task }) => {
  const { task_id, title, description, user, status } = task;
  const { handleUpdateTask, handleDeleteTask, admin } = useContext( TasksContext );
  const [currentStatus, setCurrentStatus] = useState(status);
  const [showForm, setShowForm] = useState(false);

  const handleStatusChange = (task_id, e) => {
    const newStatus = e.target.value;
    setCurrentStatus(newStatus);
    handleUpdateTask(task_id, newStatus);
    console.log("task_id, newStatus", task_id, newStatus)
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
    color: "#fff", 
  };

  return (
    <div key={task_id} className={styles.taskItem}>
      <div className={styles.containerLeft}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.description}>
          <p>{description}</p>{" "}
        </div>
      </div>

      <div className={styles.containerRight}>
        <div className={styles.assigned}>
          <p className={styles.assignedTitle}>Assigned To:</p>
          <p className={styles.assignedUser}>{user.username}</p>
        </div>
      </div>
      <select
        className={styles.status}
        value={currentStatus}
        onChange={(e) => handleStatusChange(task_id, e)}
        style={selectStyle}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Blocked">Blocked</option>
        <option value="Completed">Completed</option>
      </select>
      {admin && (
        <div className={styles.divButton}>
          <img
            className={styles.iconDelete}
            src={iconoDelete}
            alt={"Eliminar"}
            onClick={() => handleDeleteTask(task_id)}
          ></img>
          <img
            className={styles.editButton}
            src={editIcon}
            alt={"Edit"}
            onClick={toggleFormVisibility}
          />
        </div>
      )}
      {showForm && <CreateTask setShowForm={setShowForm} taskToEdit={task} />}
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    task_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    status: PropTypes.oneOf(["Pending", "In Progress", "Blocked", "Completed"])
      .isRequired,
  }).isRequired,
};

export default TaskItem;
