import React from "react";
import { NavLink } from "react-router-dom";

import style from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={style.landingPage}>
      <h2 className={style.logo}>
        Henry<span>Food</span>
      </h2>

      <div className={style.content}>
        <h3 className={style.welcome}>
          Bienvebido a Henrry<span>Food</span>
        </h3>
        <span>Que Estas Esperando Para Ejecutar Tus Recetas Favoritas</span>
        <NavLink to={"/recipes"}>
          <button className={style.btn}>Ver Recetas</button>
        </NavLink>
      </div>
    </div>
  );
}
