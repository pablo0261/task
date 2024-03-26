import { useState, useEffect } from 'react';
import axios from 'axios';

const CreateTaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pendiente');
  const [assignedTo, setAssignedTo] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Aquí hacemos la solicitud GET para obtener todos los usuarios disponibles
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
    // Aquí puedes enviar los datos del formulario a la API para crear una nueva tarea
    const formData = {
      title: title,
      description: description,
      status: status,
      assigned_to: assignedTo
    };
    axios.post('http://localhost:3000/tasks', formData)
      .then((response) => {
        console.log('Tarea creada con éxito:', response.data);
        // Aquí podrías agregar alguna lógica adicional, como limpiar el formulario o redirigir a otra página
      })
      .catch((error) => {
        console.error('Error al crear la tarea:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
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
          <option value="Pendiente">Pendiente</option>
          <option value="En proceso">En proceso</option>
          <option value="Bloqueado">Bloqueado</option>
          <option value="Completado">Completado</option>
        </select>
      </label>
      <label>
        Asignado a:
        <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
          <option value="">Selecciona un usuario</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Crear Tarea</button>
    </form>
  );
};

export default CreateTaskForm;
