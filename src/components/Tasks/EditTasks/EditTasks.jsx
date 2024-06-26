import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./EditTask.module.sass";
import iconClose from "../../../images/iconClose.png";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../../../redux/actions/actions";
import {
  PENDING,
  IN_PROGRESS,
  BLOCKED,
  COMPLETED,
} from "../../../helpers/Constants";

const EditTaskForm = ({ taskToEdit, setShowForm }) => {
  console.log(" setShowForm", setShowForm);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.tasks.users);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(PENDING);
  const [assignedTo, setAssignedTo] = useState("");
  const [newTaskData, setNewTaskData] = useState({
    title: "",
    description: "",
    status: PENDING,
    assigned_to: "190e5b65-76fd-4849-adc1-0029fe2e89f1",
  });
  console.log("newTaskData",newTaskData)

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setStatus(taskToEdit.status);
      setAssignedTo(taskToEdit.assigned_to);
    }
  }, [taskToEdit]);

  useEffect(() => {
    setNewTaskData({
      title,
      description,
      status,
      assigned_to: assignedTo,
    });
  }, [title, description, status, assignedTo]);


  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateTask(taskToEdit.task_id, newTaskData));
    setShowForm(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            Descripción:
            <textarea
              className={styles.textarea}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Estado:
            <select
              className={styles.select}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
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

EditTaskForm.propTypes = {
  taskToEdit: PropTypes.object,
  setShowForm: PropTypes.func.isRequired, 
};

export default EditTaskForm;
