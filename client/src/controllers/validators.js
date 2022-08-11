export const title = (recipe) => {
  let error = {};
  if (!recipe.title) {
    error.title = "El nombre de la recetra es requerido.";
  } else if (!/^[\w][\w _]*$/.test(recipe.title)) {
    error.title =
      "El nombre de la recetra es invalido, recuerda no incluir simbolos, ni espacios al inicio del texto.";
  }
  return error;
};

export const summary = (recipe) => {
  let error = {};
  if (!recipe.summary) {
    error.summary = "El resumen de la receta es requerido.";
  } else if (/^[ _]*$/.test(recipe.summary)) {
    error.summary =
      "El resumen de la receta es invalido, no puede contener espacios al inicio del texto.";
  }
  return error;
};

export const healthScore = (recipe) => {
  let error = {};
  if (!/^[0-9]*$/.test(recipe.healthScore)) {
    error.healthScore =
      "El nivel de comida saludable es invalido, solo se admiten numeros.";
  } else if (recipe.healthScore > 100 || recipe.healthScore < 0) {
    error.healthScore =
      "El nivel de comida saludable no puede ser mayor que 100 ni menor que 0.";
  }
  return error;
};

export const image = (recipe) => {
  let error = {};
  if (
    //eslint-disable-next-line no-useless-escape
    !/^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)+$/.test(
      recipe.image
    )
  ) {
    error.image = "La URL de la imagen es invalida.";
  }
  return error;
};
