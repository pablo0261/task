import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import animationStock from "../../../src/images/loadingGif.gif";
import style from "./Landing.module.sass";


const LandingView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      navigate("/logIn");
    }
  }, [isLoading, navigate]);

  return (
    <div className={style.background}>
      <div
        className={`${style.marginContainer} ${
          isLoading ? style.loadingContainer : style.loadedContainer
        }`}
      >
        {isLoading ? (
          <img className={style.loading} src={animationStock} alt="Loading..." />
        ) : (
          <div>landingView</div>
        )}
      </div>
    </div>
  );
};

export default LandingView;
