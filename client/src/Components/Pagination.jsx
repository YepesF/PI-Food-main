import React from "react";
import {} from "../actions";
import {} from "react-redux";

import style from "./Pagination.module.css";

export default function Pagination({
  recipesPerPage,
  totalRecipes,
  paginate,
  currentPage,
}) {
  // const numPages = [];

  // for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
  //   numPages.push(i);
  // }

  return (
    <div className={style.content}>
      {currentPage > 1 && (
        <button
          className={style.prev}
          onClick={() => paginate(currentPage - 1)}
        >
          {"< Anterior"}
        </button>
      )}
      <div className={style.pages}>
        <span className={style.currentPage}>{currentPage}</span> de{" "}
        {Math.ceil(totalRecipes / recipesPerPage)}
      </div>
      {currentPage < Math.ceil(totalRecipes / recipesPerPage) && (
        <button
          className={style.next}
          onClick={() => paginate(currentPage + 1)}
        >
          {"Siguiente >"}
        </button>
      )}
    </div>
    // <div>
    //   {numPages.map((num) => (
    //     <button key={num} onClick={() => paginate(num)}>
    //       {num}
    //     </button>
    //   ))}
    // </div>
  );
}
