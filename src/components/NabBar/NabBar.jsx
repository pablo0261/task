import style from "./NabBar.module.sass";
const NabBar = () => {
  return (
    <div className={style.backWrapper}>
      <div className={style.divInputs}>

        <input className={style.Inputs1} placeholder="Filtrar por nombre..." />
        <input className={style.Inputs2} placeholder="Filtrar por email..." />
      </div>
      <div className={style.divButtonCreateTask}>
        <button className={style.ButtonCreateTask}>
         + Tarea
        </button>
      </div>
    </div>
  );
};

export default NabBar;
