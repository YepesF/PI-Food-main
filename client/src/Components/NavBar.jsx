import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <ul>
        <li>
          <NavLink to={"/recipes"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/recipes/create"}>Crear Receta</NavLink>
        </li>
      </ul>
    </div>
  );
}
