import { useState, useContext } from "react";
import PropTypes from "prop-types";
import styles from "./CreateTask.module.sass";
import iconClose from "../../../images/iconClose.png";
import { useSelector } from "react-redux";
import {
  PENDING,
  IN_PROGRESS,
  BLOCKED,
  COMPLETED,
} from "../../../helpers/Constants";
import { TasksContext } from "../../../views/myTasks/MyTasksView";

const CreateTaskForm = () => {
  const { setshowCreateForm, handleCreateTask } = useContext(TasksContext);
  const users = useSelector((state) => state.tasks.users);
  const [newTaskData, setNewTaskData] = useState({
    title: "",
    description: "",
    status: PENDING,
    assigned_to: "",
  });
  console.log("newTaskData", newTaskData)

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreateTask(newTaskData);
    setshowCreateForm(false);
    // Limpiar los datos del formulario después de enviarlo
    setNewTaskData({
      title: "",
      description: "",
      status: PENDING,
      assigned_to: "",
    });
  };


  const handleCloseForm = () => {
    setshowCreateForm(false);
    // Limpiar los datos del formulario al cerrarlo
    setNewTaskData({
      title: "",
      description: "",
      status: PENDING,
      assigned_to: "",
    });
  };

  return (
    <div className={styles.background}>
      <div className={styles.blurBackground}>
        <form className={styles.TaskForm} onSubmit={handleSubmit}>
          <img
            className={styles.iconClose}
            src={iconClose}
            alt={"X"}
            onClick={handleCloseForm}
          />
          <label>
            Título:
            <input
              className={styles.inputTitulo}
              type="text"
              value={newTaskData.title}
              onChange={(e) =>
                setNewTaskData({ ...newTaskData, title: e.target.value })
              }
            />
          </label>
          <label>
            Descripción:
            <textarea
              className={styles.textarea}
              value={newTaskData.description}
              onChange={(e) =>
                setNewTaskData({ ...newTaskData, description: e.target.value })
              }
            />
          </label>
          <label>
            Estado:
            <select
              className={styles.select}
              value={newTaskData.status}
              onChange={(e) =>
                setNewTaskData({ ...newTaskData, status: e.target.value })
              }
            >
              <option value={PENDING}>Pendiente</option>
              <option value={IN_PROGRESS}>En proceso</option>
              <option value={BLOCKED}>Bloqueado</option>
              <option value={COMPLETED}>Completado</option>
            </select>
          </label>
          <label>
            Asignado a:
            <select
              className={styles.select}
              value={newTaskData.assigned_to}
              onChange={(e) => 
                setNewTaskData({ ...newTaskData, assigned_to: e.target.value })}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </label>
          <button className={styles.button} type="submit">
            Todo Listo
          </button>
        </form>
      </div>
    </div>
  );
};

CreateTaskForm.propTypes = {
  taskToEdit: PropTypes.object,
};

export default CreateTaskForm;
