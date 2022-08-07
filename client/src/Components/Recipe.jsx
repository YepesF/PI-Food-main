import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Recipe.module.css";

export default function Recipe({ id, image, title, diets, healthScore }) {
  return (
    <div className={style.recipe}>
      <NavLink to={`/recipes/detail/${id}`}>
        <div className={style.img_score}>
          <span className={style.healthScore}>
            <span className={style.score}>{healthScore}</span>
            Score
          </span>
          <img className={style.img} src={image} alt="Aun No Hay Imagen" />
        </div>
      </NavLink>
      <div className={style.title}>
        <NavLink to={`/recipes/detail/${id}`}>{title}</NavLink>
      </div>
      <div className={style.diets}>
        {diets &&
          diets.map((diet, current) => (
            <span className={style.diet} key={`diet${current}`}>
              {diet}
            </span>
          ))}
      </div>
    </div>
  );
}
