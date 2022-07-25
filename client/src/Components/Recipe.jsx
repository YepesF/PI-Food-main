import React from "react";
import { NavLink } from "react-router-dom";

export default function Recipe({
  id,
  image,
  title,
  typediet,
  vegetarian,
  vegan,
  glutenFree,
}) {
  return (
    <div>
      <img src={image} alt="Aun No Hay Imagen" />
      <NavLink to={`/recipes/detail/${id}`}>
        <h2>{title}</h2>
      </NavLink>
      <p>{typediet}</p>
      <p>
        {vegetarian && "Vegetarian "} {vegan && "Vegan"}{" "}
        {glutenFree && "Gluten Free"}
      </p>
    </div>
  );
}
