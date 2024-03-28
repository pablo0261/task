// import { useState } from 'react';

// const TaskForm = ({ onCreateTask }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Validar los datos del formulario antes de crear la tarea
//     if (!title.trim() || !description.trim()) {
//       alert('Por favor, completa todos los campos.');
//       return;
//     }
//     // Crear la tarea utilizando la función recibida como prop
//     onCreateTask({ title, description });
//     // Limpiar los campos del formulario después de crear la tarea
//     setTitle('');
//     setDescription('');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Título:
//         <input
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//       </label>
//       <label>
//         Descripción:
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//       </label>
//       <button type="submit">Editar Tarea</button>
//     </form>
//   );
// };

// export default TaskForm;
