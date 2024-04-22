import style from "./NabBar.module.sass";
import ButtonCreateTask from "../buttonCreateTask/ButtonCreateTask";


const NabBar = () => {
 
  return (
    <div className={style.backWrapper}>
      <div className={style.divInputs}>

        <input className={style.Inputs1} placeholder="Filtrar por nombre..." />
        <input className={style.Inputs2} placeholder="Filtrar por email..." />
      </div>
      <div className={style.buttonsNavbar}>
      <ButtonCreateTask/>
      </div>
    </div>
  );
};

export default NabBar;
