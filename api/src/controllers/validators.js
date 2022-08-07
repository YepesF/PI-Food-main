const validationTitle = (title) => {
  if (typeof title !== "string") return { msg: "El titulo debe ser un string" };

  if (!title) return { msg: "El nombre de la receta es requerido." };

  if (!/^[\w][\w _]*$/.test(title))
    return {
      msg: "El nombre de la receta es invalido, recuerda no incluir simbolos, ni espacios al inicio del texto.",
    };
};

const validationSummary = (summary) => {
  if (typeof summary !== "string")
    return { msg: "El resumen debe ser un string" };

  if (!summary) return { msg: "El resumen de la receta es requerido." };

  if (/^[ _]*$/.test(summary))
    return {
      msg: "El resumen de la receta es invalido, no puede contener espacios al inicio del texto.",
    };
};

const validationHealthScore = (healthScore) => {
  if (!/^[0-9]*$/.test(healthScore))
    return {
      msg: "El nivel de comida saludable es invalido, solo se admiten numeros.",
    };

  if (healthScore > 100 || healthScore < 0)
    return {
      msg: "El nivel de comida saludable no puede ser mayor que 100 ni menor que 0.",
    };
};

module.exports = { validationTitle, validationSummary, validationHealthScore };
