import style from "./NabBar.module.sass";
import { useState } from "react";
import CreateTask from "../../components/Tasks/CreateTasks/CreatTasks"


const NabBar = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <div className={style.backWrapper}>
      <div className={style.divInputs}>

        <input className={style.Inputs1} placeholder="Filtrar por nombre..." />
        <input className={style.Inputs2} placeholder="Filtrar por email..." />
      </div>
      <div className={style.divButtonCreateTask}>
        <button onClick={toggleFormVisibility} className={style.ButtonCreateTask}>
         + Tarea
         {showForm && <CreateTask setShowForm={setShowForm} />}
        </button>
      </div>
    </div>
  );
};

export default NabBar;
