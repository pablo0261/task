import style from "./ButtonCreateTask.module.sass";
import { useContext } from "react";
import { TasksContext } from "../../views/myTasks/MyTasksView"

const ButtonCreateTask = () => {
  const { showCreateForm, setshowCreateForm } = useContext(TasksContext);

  const toggleFormVisibility = () => {
    setshowCreateForm(!showCreateForm);
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