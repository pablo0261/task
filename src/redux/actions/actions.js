import axios from "axios";
import Swal from "sweetalert2";

import { GET_TASK, ADD_TASK, DELETE_TASK, UPDATE_TASK, GET_USERS  } from "./action-types";

const REACT_APP_API_URL = import.meta.env.VITE_BASE_URL;

const addTask = (task) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/tasks`, task);
      dispatch({
        type: ADD_TASK,
        payload: response.data, 
      });
      Swal.fire({
        title: "Tarea agregada con éxito",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
  };
};

const getTask = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/tasks`);
      
      dispatch({
        type: GET_TASK,
        payload: response.data, 
      });
      Swal.fire({
        title: "Tarea cargadas con exito",
        icon: "success",
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

const deleteTask = (taskId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${REACT_APP_API_URL}/tasks/${taskId}`);
      dispatch({
        type: DELETE_TASK,
        payload: taskId, // Envía el ID de la tarea eliminada al reducer
      });
      Swal.fire({
        title: "Tarea eliminada con éxito",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
  };
};

const updateTask = (taskId, updatedTask) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${REACT_APP_API_URL}/tasks/${taskId}`, updatedTask);
      dispatch({
        type: UPDATE_TASK,
        payload: response.data.task, // Envía la tarea actualizada al reducer
      });
      Swal.fire({
        title: "Tarea actualizada con éxito",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      Swal.fire({
        title: `${error}`,
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
  };
};

const getUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/users`);
      dispatch({
        type: GET_USERS,
        payload: response.data,
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

export { addTask, getTask, deleteTask, updateTask, getUsers };
