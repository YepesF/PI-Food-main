import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipe } from "../actions";

import style from "./DetailRecipe.module.css";

export default function DetailRecipe(props) {
  const { id } = useParams(props), //Obtengo los parametros de la url
    dispatch = useDispatch(); //Obtengo el dispatch

  let detailRecipe = useSelector((state) => state.detailRecipe); //Obtengo informacion del estado global.

  useEffect(() => {
    //Obtener la informacion una vez cargue la pagina y traiaga la informacion necesaria.
    dispatch(getRecipe(id));
    window.scrollTo(0, 0);
  }, [id, dispatch]);

  return (
    <div>
      <img src="../source/next.png" alt="" />
      {detailRecipe ? (
        <div className={style.content}>
          <h2 className={style.title}>{detailRecipe.title}</h2>
          <div className={style.contentTwo}>
            <img src={detailRecipe.image} alt="Aun No Hay Imagen" />
            <div>
              <div className={style.healthScore}>
                <img
                  src={require("../source/health.png").default}
                  alt="Health Score"
                />
                <p>{`${detailRecipe.healthScore} Points`}</p>
              </div>

              <div className={style.dishTypes}>
                <img
                  src={require("../source/dish.png").default}
                  alt="Dish Types"
                />
                <p>{detailRecipe.dishTypes}</p>
              </div>

              <div className={style.diets}>
                <img src={require("../source/diets.png").default} alt="Diets" />
                <div>
                  {detailRecipe.diets &&
                    detailRecipe.diets.map((diet, current) => (
                      <p className={style.diet} key={`dt${current}`}>
                        {diet}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div
            className={style.summary}
            dangerouslySetInnerHTML={{ __html: detailRecipe.summary }}
          />
          <div className={style.instructions}>
            <h3>Instructions</h3>
            <div
              dangerouslySetInnerHTML={{ __html: detailRecipe.instructions }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
