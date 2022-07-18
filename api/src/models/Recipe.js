const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      healthScore: {
        type: DataTypes.INTEGER,
        validate: {
          isEvent(value) {
            if (value < 0 || value > 100) {
              throw new Error(
                "Health Score esta fuera del rango de calificacion estimado."
              );
            }
          },
        },
      },
      analyzedInstructions: {
        type: DataTypes.ARRAY(DataTypes.JSON),
      },
      image: {
        type: DataTypes.TEXT,
        validate: {
          isUrl: true,
        },
      },
      dishTypes: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
      },
      idname: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.id}${this.title}`;
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
