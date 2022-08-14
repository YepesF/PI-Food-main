const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notValid(value) {
            if (!/^[\w][\w _]*$/.test(value)) {
              throw new Error(
                "El nombre de la recetra es invalido, recuerda no incluir simbolos, ni espacios al inicio del texto."
              );
            }
          },
        },
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notValid(value) {
            if (/^[ _]*$/.test(value)) {
              throw new Error(
                "El resumen de la receta es invalido, no puede contener espacios al inicio del texto."
              );
            }
          },
        },
      },
      healthScore: {
        type: DataTypes.INTEGER,
        validate: {
          notValid(value) {
            if (!/^[0-9]*$/.test(value)) {
              throw new Error(
                "El nivel de comida saludable es invalido, solo se admiten numeros."
              );
            } else if (value < 0 || value > 100) {
              throw new Error(
                "El nivel de comida saludable no puede ser mayor que 100 ni menor que 0."
              );
            }
          },
        },
      },
      instructions: {
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.TEXT,
        // validate: {
        //   isUrl: true,
        // },
      },
    },
    {
      timestamps: false,
    }
  );
};
