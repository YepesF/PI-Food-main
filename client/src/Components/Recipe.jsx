import React from "react";
import { NavLink } from "react-router-dom";

export default function Recipe({ image, title, typediet }) {
  return (
    <div>
      <img src={image} alt="Aun No Hay Imagen" />
      <NavLink to={"/recipes/detail"}>
        <h2>{title}</h2>
      </NavLink>
      <p>{typediet}</p>
    </div>
  );
}
