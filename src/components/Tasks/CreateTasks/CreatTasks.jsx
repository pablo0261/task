import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './CreateTask.module.sass'; 
import iconClose from '../../../images/iconClose.png';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, getUsers  } from '../../../redux/actions/actions.js';
import { PENDING, IN_PROGRESS, BLOCKED, COMPLETED } from '../../../helpers/Constants'

const CreateTaskForm = ({ taskToEdit, setShowForm }) => {
  const dispatch = useDispatch(); 
  const users = useSelector(state => state.users); 
  
  const tasks = useSelector(state => state.tasks);

  console.log("tasks del reducer", tasks)

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [assignedTo, setAssignedTo] = useState('');



  useEffect(() => {
    if (taskToEdit) {
    setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setStatus(taskToEdit.status);
      setAssignedTo(taskToEdit.assigned_to);
    }
  }, [taskToEdit]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTaskData = {
      title: title,
      description: description,
      status: status,
      assigned_to: assignedTo
    };
    dispatch(addTask(newTaskData));
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
          <option value={PENDING}>Pendiente</option>
          <option value={IN_PROGRESS}>En proceso</option>
          <option value={BLOCKED}>Bloqueado</option>
          <option value={COMPLETED}>Completado</option>
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