import React from "react";

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
          onClick={() => {
            paginate(currentPage - 1);
            window.scrollTo(0, 0);
          }}
        >
          {"< Anterior"}
        </button>
      )}
      <div className={style.pages}>
        <span className={style.currentPage}>{currentPage}</span>
        {` de ${totalRecipes ? Math.ceil(totalRecipes / recipesPerPage) : 1}`}
      </div>
      {currentPage < Math.ceil(totalRecipes / recipesPerPage) && (
        <button
          className={style.next}
          onClick={() => {
            paginate(currentPage + 1);
            window.scrollTo(0, 0);
          }}
        >
          {"Siguiente >"}
        </button>
      )}
    </div>
    // <div className={style.pagination}>
    //   {numPages.map((num) => (
    //     <button
    //       className={style.page}
    //       key={num}
    //       onClick={() => {
    //         paginate(num);
    //         window.scrollTo(0, 0);
    //       }}
    //     >
    //       {num}
    //     </button>
    //   ))}
    // </div>
  );
}
