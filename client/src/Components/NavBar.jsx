import React from "react";
import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";

export default function NavBar() {
  return (
    <nav className={style.content}>
      <NavLink to={"/recipes"}>
        <h2 className={style.logo}>
          Henry<span>Food</span>
        </h2>
      </NavLink>
      <ul className={style.options}>
        <li
          className={
            document.location.pathname === "/recipes/create"
              ? style.disable
              : null
          }
        >
          <NavLink to={"/recipes/create"}>Crear Receta</NavLink>
        </li>
      </ul>
    </nav>
  );
}
