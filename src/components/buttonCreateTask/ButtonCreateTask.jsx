import style from "./ButtonCreateTask.module.sass";
import { useState } from "react";
import CreateTask from "../../components/Tasks/CreateTasks/CreatTasks";

const ButtonCreateTask = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return(
  <div className={style.divButtonCreateTask}>
    <button onClick={toggleFormVisibility} className={style.ButtonCreateTask}>
      + Tarea 
    </button>
    {showForm && <CreateTask setShowForm={setShowForm} />}
  </div>
  )
};

export default ButtonCreateTask;