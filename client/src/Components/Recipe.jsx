import React from "react";
import { NavLink } from "react-router-dom";

export default function Recipe({
  id,
  image,
  title,
  diets,
  healthScore,
}) {
  return (
    <div>
      <img src={image} alt="Aun No Hay Imagen" />
      <NavLink to={`/recipes/detail/${id}`}>
        <h2>{title}</h2>
      </NavLink>
      <p>{healthScore}</p>
      {diets && diets.map(diet => (<p>{diet}</p>))}
    </div>
  );
}
