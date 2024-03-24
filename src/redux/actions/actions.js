import axios from "axios";
import Swal from "sweetalert2";

import { ADD_TASK } from "./action-types";

const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;

const addTask = (task) => {
  return async (dispatch) => {
    try {
      // Realizar la solicitud POST para agregar la tarea
      const response = await axios.post(`${REACT_APP_API_URL}/tasks`, task);
      
      // Despachar la acción para agregar la tarea al estado global
      dispatch({
        type: ADD_TASK,
        payload: response.data, // Usar los datos de la respuesta para actualizar el estado
      });

      // Mostrar un mensaje de éxito utilizando SweetAlert2
      Swal.fire({
        title: "Tarea agregada con éxito",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      // Manejar cualquier error que ocurra durante la solicitud
      Swal.fire({
        title: `${error}`,
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
  };
};

export { addTask };
