import style from "./ButtonCreateTask.module.sass";
import { useContext } from "react";
import { TasksContext } from "../../views/myTasks/MyTasksView"

const ButtonCreateTask = () => {
  const { showForm, setShowForm } = useContext(TasksContext);

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return(
  <div className={style.divButtonCreateTask}>
    <button onClick={toggleFormVisibility} className={style.ButtonCreateTask}>
      + Tarea 
    </button>
  </div>
  )
};

export default ButtonCreateTask;