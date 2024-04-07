import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './CreateTask.module.sass'; 
import iconClose from '../../../images/iconClose.png';
import { useTasks } from '../../../views/myTasks/MyTasksView';

const CreateTaskForm = ({ taskToEdit, setShowForm }) => {
  const { handleCreateTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pendiente');
  const [assignedTo, setAssignedTo] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (taskToEdit) {
    setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setStatus(taskToEdit.status);
      setAssignedTo(taskToEdit.assigned_to);
    }
  }, [taskToEdit]);

  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los usuarios:', error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTaskData = {
      title: title,
      description: description,
      status: status,
      assigned_to: assignedTo
    };
    handleCreateTask(newTaskData);
    setShowForm(false);
  };

  const handleCloseForm = () => {
    setShowForm(false); 
  };

  return (
    <div className={styles.background}>
    <div className={styles.blurBackground}>
    <form className={styles.TaskForm} onSubmit={handleSubmit} >
      <img className={styles.iconClose} src={iconClose} alt={"X"} onClick={handleCloseForm} />
      <label>
        Título:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Descripción:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Estado:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pendiente</option>
          <option value="In Progress">En proceso</option>
          <option value="Blocked">Bloqueado</option>
          <option value="Completed">Completado</option>
        </select>
      </label>
      <label>
        Asignado a:
        <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
          <option value="">Responsable</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Todo Listo</button>
    </form>
    </div>
    </div>
  );
};

CreateTaskForm.propTypes = {
  taskToEdit: PropTypes.object,
  setShowForm: PropTypes.func
};

export default CreateTaskForm;