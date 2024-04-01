import style from './NabBar.module.sass'
const NabBar = () => {


  return (
    <div className={style.backWrapper}>
      <div className={style.divInputs}>
        <input className={style.Inputs} placeholder="Filtrar por nombre..." />
        <input className={style.Inputs} placeholder="Filtrar por email..." />
      </div>
      <div>
        <button className={style.ButtonCreateTask}>+ Crear tarea </button>
      </div>
    </div>
  );
};

export default NabBar;
