import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRecipe } from "../actions";

export default function DetailRecipe(props) {
  const { id } = useParams(props), //Obtengo los parametros de la url
    dispatch = useDispatch(); //Obtengo el dispatch

  let detailRecipe = useSelector((state) => state.detailRecipe); //Obtengo informacion del estado global.

  useEffect(() => {
    //Obtener la informacion una vez cargue la pagina y traiaga la informacion necesaria.
    dispatch(getRecipe(id));
  }, [id, dispatch]);

  return (
    <div>
      <h1>Detalle Receta</h1>
      {detailRecipe ? (
        <div>
          <img src={detailRecipe.image} alt="Aun No Hay Imagen" />
          <h2>{detailRecipe.title}</h2>
          <p>{detailRecipe.dishTypes}</p>
          {detailRecipe.diets &&
            detailRecipe.diets.map((diet, current) => (
              <p key={`dt${current}`}>{diet}</p>
            ))}
          <div dangerouslySetInnerHTML={{ __html: detailRecipe.summary }} />
          <p>{detailRecipe.healthScore}</p>
          <div
            dangerouslySetInnerHTML={{ __html: detailRecipe.instructions }}
          />
        </div>
      ) : null}
    </div>
  );
}
